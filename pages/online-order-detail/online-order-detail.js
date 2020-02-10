//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    timeNow: '2018-11-01',
    detailData:{},
    index:0,
    id:0,
    totalPrice:'',
    differentPrice:'',
    correctPrice:'',
    oldTotalPrice:''
  },
  //事件处理函数
  bindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  getDetail(){
    var that = this;
    wx.request({
      url: app.globalData.questUrl + '/web/stage/manageMiniProgram/diningOrderDetail',
      data:{
        orderId: that.data.id,
        token: app.globalData.token
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.result) {
          if (res.data.data.oldDishes&&res.data.data.oldDishes.length>0){
            res.data.data.oldDishes.forEach(n => {
              for (var s in n) {
                if (s == 'money') {
                  n[s] = n[s] ? n[s].toFixed(2):'0.00';
                }
              }
            });
          }
          if (res.data.data.dishes&&res.data.data.dishes.length > 0) {
            res.data.data.dishes.forEach(n => {
              for (var s in n) {
                if (s == 'money') {
                  n[s] = n[s] ? n[s].toFixed(2):'0.00';
                }
              }
            });
          }
          that.setData({
            detailData:res.data.data,
            totalPrice: res.data.data.totalPrice ? res.data.data.totalPrice.toFixed(2):'0.00',
            differentPrice: res.data.data.differentPrice ? res.data.data.differentPrice.toFixed(2):'0.00',
            oldTotalPrice: res.data.data.oldTotalPrice ? res.data.data.oldTotalPrice.toFixed(2) : '0.00',
          })
          console.log(that.data.detailData)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },
  getOrderType: function (status) {//订单状态
    var text = '';
    switch (Number(status)) {
      case 1: text = '未支付'; break;
      case 3: text = '支付成功'; break;
      default: text = ''; break;
    }
    return text;
  },
  getSettleType: function (status) {//结算方式
    var text = '';
    switch (Number(status)) {
      case 1:
        text = '线上支付';
        break;
      case 2:
        text = '智慧结算';
        break;
      case 3:
        text = '快速结算';
        break;
      case 4:
        text = '快速结算输入金额';
        break;
      case 5:
        text = '扫码结算';
        break;
      default:
        break;
    }
    return text;
  },
  getPaymentMode: function (status) {//支付账户
    var text = '';
    switch (Number(status)) {
      case 1:
        text = '微信支付';
        break;
      case 3:
        text = '钱包支付';
        break;
      case 4:
        text = '支付宝';
        break;
      default:
        break;
    }
    return text;
  },
  getOfflinePayment: function (status) {//支付方式
    var text = '';
    switch (Number(status)) {
      case 0: text = '账户二维码支付'; break;
      case 1: text = '虚拟卡支付'; break;
      case 2: text = 'IC卡支付'; break;
      case 3: text = '刷脸支付'; break;
      case 4: text = '聚合支付'; break;
      default: text = ''; break;
    }
    return text;
  },
  onLoad: function (options) {
    var that = this
    var id = JSON.parse(options.id);
    that.setData({
      id: id
    })
    that.getDetail();
    console.log(that.data.id)
  }
})
