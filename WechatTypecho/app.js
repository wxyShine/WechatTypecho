//app.js
const Towxml = require('/towxml/main');
App({
  Data: {
    userInfo: null,
    zaned: false
  },
  globalData:{
    userInfo: null,
    moveTIme: "2018-11-09"//系统开始运行的时间
  },
  towxml: new Towxml(),
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        console.log(this.globalData.StatusBar)
      }
    })
  }
})