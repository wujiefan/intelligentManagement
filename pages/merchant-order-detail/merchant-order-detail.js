// pages/marchant-order-detail/marchant-order-detail.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    price:'0.00',
    detailList:[
      { 
        key: 'memberName',
        name: '下单用户',
        value: ''
      },
      {
        key: 'serialNumber',
        name: '订单编号',
        value: ''
      },
      {
        key: 'status',
        name: '订单状态',
        value: ''
      },
      {
        key: 'payTime',
        name: '支付时间',
        value: ''
      },
      {
        key: 'settleMode',
        name: '结算方式',
        value: ''
      },
      {
        key: 'paymentMode',
        name: '支付账户',
        value: ''
      },
      {
        key: 'offlinePayment',
        name: '支付方式',
        value: ''
      },
      {
        key: 'diningName',
        name: '所属商户',
        value: ''
      }
    ],
  },
  getOrderDetail:function(){
    var that = this;
    wx.request({
      url: app.globalData.questUrl + '/web/stage/manageMiniProgram/merchantOrderDetail', //仅为示例，并非真实的接口地址
      data:{
        orderId: this.data.orderId,
        token:app.globalData.token
      },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.result) {
          var data = res.data.data;
          that.data.detailList.forEach(function(v){
            if(v.key == "status"){
              v.value = that.getOrderType(data[v.key]);
            } else if (v.key == "settleMode"){
              v.value = that.getSettleType(data[v.key]);
            } else if (v.key == "paymentMode") {
              v.value = that.getPaymentMode(data[v.key]);
            } else if (v.key == "offlinePayment") {
              v.value = that.getOfflinePayment(data[v.key]);
            }else{
              v.value = data[v.key];
            }
          });
          that.setData({
            price: data.price.toFixed(2),
            detailList: that.data.detailList
          });
        } else {
          wx.showToast({
            title: res.data.message || '网络异常',
            icon: 'none'
          })
        }
      }
    })
  },
  getOrderType:function(status){//订单状态
    var text = '';
    switch(Number(status)){
      case 1 : text = '未支付'; break;
      case 3 : text = '支付成功'; break;
      default : text = ''; break;
    }
    return text;
  },
  getSettleType: function (status){//结算方式
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
  onLoad: function (opt) {
    this.setData({
      orderId: opt.orderId
    });
    this.getOrderDetail();
  }
})