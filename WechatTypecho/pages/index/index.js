var API = require('../../utils/api');
var utils = require('../../utils/util.js');
var Net = require('../../utils/net');
// 获取全局应用程序实例对象
var app = getApp();
//获取当前时间
var TIME = utils.formatTime(new Date());
var EndTime = app.globalData.moveTIme;//获取系统开始运行时间
Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleCount: 0,//文章总数
    oneTime:0,//当前时间
    totimelist:[],//每日一句
    modalName:0, //公告显示
    msgList:[],  //公告内容
    noticegid:'',//公告ID

    swipelist: [],//文章分类
    topswiper: 'none',
    midposts: 'none',
    allcatslist: [],//所有分类
    allcatpostlist: [],//所有文章
    current_cat: 0,
    current_position: 'mid_99999999',
    postheight: '0'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //日期格式化
    var start_date = new Date(TIME.replace(/-/g, "/"));
    var end_date = new Date(EndTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var days = start_date.getTime() - end_date.getTime();
    //转换成天数
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    //调用文章总数
    that.articleCount();
    /*公告内容 */
    wx.request({
      url: API.NoticeList(),
      success: function (res) {
        that.setData({
          msgList: res.data.data
        })
      }
    })
   that.setData({
      //对时间进行赋值
      oneTime:day
    });
    //获取每日一句
    wx.request({
      url: 'https://open.iciba.com/dsapi/',
      success: function (res) {
       that.setData({
         totimelist:res.data
       })
      }
    })
    //调用用户登录
    wx.getUserInfo({
      success: function (res) {
        app.Data.userInfo = res.userInfo;
        wx.login({
          success: function (res) {
            app.Data.userInfo.code = res.code;
            //Login
            Net.request({
              url: API.Login(app.Data.userInfo),
              success: function (res) {
                var datas = res.data.data;
                app.Data.userInfo.openid = datas;
              },
              fail: function () {
                wx.showToast({
                  title: '网络错误',
                  image: '../../images/error1.png',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    });
    this.fetchposts();
    this.fetchallcats();   
  },
  //打印最新文章列表
  fetchposts() {
    var that = this;
    Net.request({
      url: API.GetSwiperPost(),
      success: function (res) {
        var datas = res.data.data;
        if (API.IsNull(datas)) {
          that.setData({
            topswiper: 'block',
            swipelist: datas.map(function (ori_item) {
              var item = API.ParseItem(ori_item);
              return item;
            })
          })
        }
      }
    })
  },
  touchmove(e) {
  },
  //文章的分类
  fetchallcats() {
    var that = this;
    Net.request({
      url: API.GetCat(),
      success: function (res) {
        var datas = res.data.data;
        that.data.allcatslist = datas.map(function (item) {
          item.id_tag = "mid_" + item.mid;
          return item;
        });
        that.data.allcatpostlist = datas.map(function (item) {
          return null;
        });
        if (that.data.allcatslist.length > 0) {
          that.changeCatex(that.data.allcatslist[0].mid);
        }
        that.setData({
          allcatslist: that.data.allcatslist
        })
      }
    })
  },
  //打印根据分类来打印的10篇文章
  fetchpostbymid(mid) {
    var that = this;
    var idx = this.getmidindex(mid);
    Net.request({
      url: API.GetPostsbyMID(mid),
      success: function (res) {
        var datas = res.data.data;
        if (datas != null && datas != undefined) {
          that.data.allcatpostlist[idx] = datas.map(function (item) {
            item.posttime = API.getcreatedtime(item.created);
            return item;
          });
          that.setData({
            allcatpostlist: that.data.allcatpostlist,
            postheight: that.data.allcatpostlist[idx].length * 170 + 'rpx'
          })
        } else {
          wx.showToast({
            title: '该分类没有文章',
            image: '../../images/error1.png',
            duration: 2000
          })
        }
      }
    })
  },
  getmidindex(mid) {
    for (var i = 0; i < this.data.allcatslist.length; i++)
      if (mid == this.data.allcatslist[i].mid) {
        return i;
      }
  },
  change_finish(e) {
    var that = this;
    if (e.detail.current != this.data.current_cat) {
      this.changeCatex(this.data.allcatslist[e.detail.current].mid);
      this.setData({
        current_cat: e.detail.current,
        current_position: that.data.allcatslist[e.detail.current].id_tag
      })

    }
  },
  changeCat(e) {
    this.data.current_cat_mid = e.target.dataset.mid;
    var idx = this.getmidindex(this.data.current_cat_mid);
    if (idx != this.data.current_cat) {
      this.setData({
        current_cat: idx
      })
      this.changeCatex(this.data.current_cat_mid);
    }
  },
  changeCatex(mid) {
    this.setData({
      catpostlist: []
    })
    this.data.allcatslist = this.data.allcatslist.map(function (item) {
      if (item.mid == mid)
        item.active = true;
      else
        item.active = false;
      return item;
    })
    this.setData({
      allcatslist: this.data.allcatslist
    })
    this.fetchpostbymid(mid);
  },
  //获取用户总数
  articleCount(){
    var that = this;
    Net.request({
      url: API.ArticleCount(),
      success: function (res) {
        that.setData({
          articleCount: res.data.data.counts
        })
      }
    })
  },
  /*文章列表显示卡片*/
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.setData({
      swipelist: [],
      postslist: [],
      midposts: 'none',
      topswiper: 'none',
      current_cat: 0,
      current_position: 'mid_99999999'
    })
    this.onLoad();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {  
  },
  //公告内容
  showModal(e) {
    var that = this;
    wx.request({
      url: API.NoticeList(),
      success: function (res) {
        that.setData({
          msgList: res.data.data
        })
      }
    })
    that.setData({
      modalName: e.currentTarget.dataset.target,
      noticegid: e.currentTarget.id
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})