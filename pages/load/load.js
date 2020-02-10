// pages/load/load.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../image/title.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(0)
    // 登录
    wx.login({
      success: res => {
        var that = this;
        app.globalData.code = res.code;
        console.log(res.code)
        wx.showNavigationBarLoading();
        wx.showLoading({
          title: '',
          mask: true
        })
        app.globalData.appId = wx.getAccountInfoSync().miniProgram.appId;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.ajax('post','/auth/login/wechat_mini',{
          code:res.code,
          clientId:8
        })
        .then(res=>{
          if(res.data.token){
            wx.redirectTo({
              url:"../index/index"
            })
          }else{
            app.globalData.beBindOpenid = res.data.openid
            wx.redirectTo({
              url:"../login/login"
            })
          }
        })
        .catch(res=>{
          wx.showToast({
            title: res.message || '网络异常',
            icon: 'none'
          })
        })
        // wx.request({
        //   url: app.globalData.questUrl + '/web/stage/manageMiniProgram/login',
        //   method: 'POST',
        //   data: {
        //     'code': res.code
        //   },
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success: function (res) {
        //     wx.hideNavigationBarLoading();
        //     wx.hideLoading();
        //     var data = res.data.data;
        //     if (res.data.result) {
        //       app.globalData.token = data.token;
        //       if (data.isRegister) {
        //         app.globalData.userKind.kind = data.kind;
        //         app.globalData.userKind.type = data.type;
        //         app.globalData.merchantName = data.merchantName;
        //         app.globalData.userName = data.userName;
        //         app.globalData.orderTypeId = data.orderTypeId;
        //         app.globalData.userId = data.userId;
        //         wx.redirectTo({
        //           url: "../index/index"
        //         })
        //       }else{
        //         wx.redirectTo({
        //           url: "../login/login"
        //         })
        //       }
        //     } else {
        //       wx.showToast({
        //         title: res.data.message || '网络异常',
        //         icon: 'none'
        //       })
        //     }
        //   }
        // })
      },
      fail:res=>{
        console.log(res)
      }
    })
  },
})