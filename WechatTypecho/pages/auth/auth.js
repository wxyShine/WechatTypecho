var API = require('../../utils/api');
var app = getApp();
var Net = require('../../utils/net');
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },
  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo){
      return;
    }
    app.Data.userInfo = e.detail.userInfo;    
    wx.login({
      success:function(res){
        app.Data.userInfo.code = res.code;
        Net.request({
          url: API.Login(app.Data.userInfo),
          success: function(res) {
            var datas = res.data.data;
            app.Data.userInfo.openid = datas;
            //返回上一页
            wx.navigateBack();
          }
        })      
      }
    })
  }
})