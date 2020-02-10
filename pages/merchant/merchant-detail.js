import WxValidate from "../../utils/WxValidate.js"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantId: '',
    detailInfo: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id) {
      this.setData({ merchantId: options.id });
      this.getMerchantDetail();
      wx.setNavigationBarTitle({
        title: '编辑商户'
      })
    }
    this.initValidate();
    this.setData({
      departmentName: app.globalData.merchantName
    })
  },
  initValidate() {
    /*** 4-2(配置规则)*/
    const rules = {
      name: {
        required: true,
      },
      contacts: {
        required: true,
      },
      telno: {
        required: true,
        isTel: true
      },
      address: {
        required: true,
      }
    }
    const messages = {
      name: {
        required: '请输入名称',
      },
      contacts: {
        required: '请输入管理员姓名',
      },
      telno: {
        required: '请输入管理员手机号',
        isTel: '请输入正确的手机号'
      },
      address: {
        required: '请输入地址',
      }
    };
    this.WxValidate = new WxValidate(rules, messages)
    this.WxValidate.addMethod('isTel', (value, param) => {
      return /^1\d{10}$/.test(value)
    }, '请输入正确的手机号')

  },
  formSubmit(e) {
    let params = e.detail.value;
    console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
    } else {
      let url = this.data.merchantId ? '/web/stage/manageMiniProgram/modifyDining' : '/web/stage/manageMiniProgram/createDining'
      let data = {
        type: 1,
        ids: ["0"]
      }
      this.data.merchantId && (data.id = this.data.merchantId);
      Object.assign(data, params)
      app.ajax('post', url, data).then(res => {
        if (res.result) {
          wx.showModal({
            content: '操作成功',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    }
  },
  getMerchantDetail() {
    app.ajax('get', '/web/stage/manageMiniProgram/getDiningDetail', { diningId: this.data.merchantId }).then(res => {
      if (res.result) {
        this.setData({
          detailInfo: res.data
        })
        this.data.payMethod.forEach(v => {
          if (res.data.thirdPartyPay.indexOf(v.name) > -1) {
            v.checked = true
          }
        })
        this.setData({
          payMethod: this.data.payMethod
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  }
})