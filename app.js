//app.js
const util = require('./utils/util.js')
const exceptUrl=[
  '/auth/login/wechat_mini'
]
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onHide: function () {
    // wx.login({
    //   success: res => {
    //     var that = this;
    //     this.globalData.code = res.code;
    //     wx.showNavigationBarLoading();
    //     wx.showLoading({
    //       title: '',
    //       mask: true
    //     })
    //     wx.request({
    //       url: this.globalData.questUrl + '/web/stage/manageMiniProgram/login',
    //       method: 'POST',
    //       data: {
    //         'code': res.code
    //       },
    //       header: {
    //         'content-type': 'application/json'
    //       },
    //       success: function (res) {
    //         wx.hideNavigationBarLoading();
    //         wx.hideLoading();
    //         var data = res.data.data;
    //         if (res.data.result) {
    //           that.globalData.token = data.token;
    //           if (!data.isRegister) {
    //             wx.redirectTo({
    //               url: "../login/login"
    //             })
    //           }
    //         }
    //       }
    //     })
    //   }
    // })
  },
  ajax:function(method, url, data, config = {}){
    var that = this
    let headerConfig = {
      'content-type': 'application/json'
    }
    if(exceptUrl.indexOf(url) === -1){
      headerConfig.Authorization= wx.getStorageSync('token')
    }
    let defaultData = {}
    return new Promise((resolve, reject) => {  // 返回一个promise
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: this.globalData.questUrl + url, // 拼接url
        data: Object.assign({}, defaultData, data),
        header: Object.assign({}, headerConfig, config), // 合并传递进来的配置
        method: method,
        success(res) {
          wx.hideLoading()
          if (res.header.Authorization) {
            that.globalData.token = res.header.Authorization;
            wx.setStorageSync('token', res.header.Authorization);
          }
          if(res.statusCode == 200){
            if (res.data.result) {
              resolve(res.data);
            } else {
              reject(res.data.message);
            }
          }else if(res.statusCode == 401 && exceptUrl.indexOf(url)>-1 ){
            resolve(res.data);
          }else{
            reject(res.data);
          }
        },
        fail(res){
          wx.hideLoading();
          reject(res)
        }
      })
    })
  },
  showError(msg){
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  util:{
    deepCopy: util.deepCopy
  },
  globalData: {
    userInfo: null,
    code: null,
    token: null,
    beBindOpenid:null,
    merchantName: null,
    departmentName:null,
    userName: null,
    userKind:{
      kind:null,
      type:null
    },
    orderTypeId:null,
    userId:null,
    sucketUrl: '',
    // questUrl:'https://dev.xiaozhun.net',
    // questUrl: 'http://dev.51dingdian.com',
    // questUrl:'https://saas.51dingdian.com'
    // questUrl:'http://192.168.100.210:8080/web'
    questUrl:'http://192.168.100.144:9040/web'
  }
})