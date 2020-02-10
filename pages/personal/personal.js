// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settingList: [
      {
        id: 1,
        name: "修改密码",
        bindtap: 'resetPassword'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  resetPassword: function () {
    wx.navigateTo({
      url: '/pages/password/password',
    })
  },
  switchUser: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})