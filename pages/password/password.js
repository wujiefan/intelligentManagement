// pages/paddword/paddword.js
const md5 = require('../../utils/md5.js')
import WxValidate from "../../utils/WxValidate.js"
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
  },
  initValidate() {
    /*** 4-2(配置规则)*/
    const rules = {
      oldPassword: {
        required: true,
        rangelength: [6, 16]
      },
      newPassword: {
        required: true,
        rangelength: [6, 16]
      },
      confirmPassword: {
        required: true,
        rangelength: [6, 16]
      },
    }
    const messages = {
      oldPassword: {
        required: '请输入原密码',
        rangelength:'密码长度为6-16位'
      },
      newPassword: {
        required: '请输入新密码',
        rangelength: '密码长度为6-16位'
      },
      confirmPassword: {
        required: '请再次输入新密码',
        rangelength: '密码长度为6-16位'
      },
    };
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit(e){
    let params = e.detail.value;
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
    } else if (params.oldPassword == params.newPassword) {
      wx.showModal({
        content: '新密码不能喝原密码一致',
        showCancel: false,
      })
    } else if (params.newPassword != params.confirmPassword){
      wx.showModal({
        content: '两次输入不一致',
        showCancel: false,
      })
    }else{
      app.ajax('post', '/web/stage/manageMiniProgram/changeLoginPassword', { oldPassword: md5.md5(params.oldPassword), newPassword: md5.md5(params.newPassword)}).then(res=>{
        if(res.result){
          wx.showModal({
            content: '操作成功',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }else{
          app.showError(res.message)
        }
      })
    }
  }
})