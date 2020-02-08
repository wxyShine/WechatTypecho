//获取应用实例
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {},
  //赞赏支持
  showSupport() {
    wx.previewImage({
      urls: ['https://wxy97.com/usr/xcx/zanshang.png'],
      current: 'https://wxy97.com/usr/xcx/zanshang.png' // 当前显示图片的http链接      
    })
  },
})
