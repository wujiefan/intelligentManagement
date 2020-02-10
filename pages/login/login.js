const app = getApp();
// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    telNo:'',
    qrCode:'',
    codeText:'获取验证码',
    canClick:false
  },
  toCodePage:function(){
    this.getVerificationCode();
  },
  toLogin:function(){
    var that = this;
    app.ajax('post','/auth/login/mobile_code',{
      mobile:this.data.telNo,
      mobileCode:this.data.qrCode,
      clientId:8,
      beBindOpenid:app.globalData.beBindOpenid
    })
    .then(res=>{
      wx.reLaunch({
        url: '../index/index'
      })
    })
    .catch(res=>{
      wx.showToast({
        title: res.message || '网络异常',
        icon: 'none'
      })
    })
    // wx.request({
    //   url: app.globalData.questUrl + '/web/stage/login/verifyManagerMini',
    //   method: 'post',
    //   data: {
    //     telno: this.data.telNo,
    //     code: this.data.qrCode,
    //     token: app.globalData.token
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     if (res.data.result) {
    //       app.globalData.userKind.kind = res.data.data.kind;
    //       app.globalData.userKind.type = res.data.data.type;
    //       app.globalData.merchantName = res.data.data.merchantName;
    //       app.globalData.userName = res.data.data.userName;
    //       app.globalData.orderTypeId = res.data.data.orderTypeId;
    //       app.globalData.userId = res.data.data.userId;
    //       wx.reLaunch({
    //         url: '../index/index'
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.message,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  },
  changeTel:function(e){
    this.data.telNo = e.detail.value;
  },
  changeCode: function (e) {
    this.data.qrCode = e.detail.value;
  },
  getVerificationCode:function(){
    var that = this;
    if (this.data.canClick){
      return
    }
    if (/^1\d{10}$/.test(this.data.telNo)) {
      app.ajax('get','/auth/login/mobile_code',{mobile:this.data.telNo})
      .then(res=>{
          wx.showModal({
            titie: '提示',
            content: res.data || "短信已发送,请注意查收短信!",
            showCancel: false
          })
          that.verDelay();
      })
      .catch(res=>{
        console.log(res)
        wx.showToast({
          title: res.message || '网络异常',
          icon: 'none'
        })
      })
      // wx.request({
      //   url: app.globalData.questUrl + '/web/stage/login/miniVerificationCode',
      //   method: 'get',
      //   data: {
      //     telNo: this.data.telNo
      //   },
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success: function (res) {
      //     if (res.data.result) {
      //       wx.showModal({
      //         titie: '提示',
      //         content: res.data.data || "短信已发送,请注意查收短信!",
      //         showCancel: false
      //       })
      //       that.verDelay();
      //     } else {
      //       wx.showToast({
      //         title: res.data.message || '网络异常',
      //         icon: 'none'
      //       })
      //     }
      //   }
      // })
    } else {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: 'none'
      })
    }
  },
  verDelay:function(){
    var time = 60;
    var that = this;
    this.setData({
      codeText: '剩余' + time + '秒',
      canClick:true
    });
    var timer = setInterval(function () {
      if (time <= 0) {
        clearInterval(timer);
        that.setData({
          codeText: '获取验证码',
          canClick:false
        });
      } else {
        that.setData({
          codeText: '剩余' + (--time) + '秒'
        });
      }
    }, 1000);
  }
})