// pages/marchant-order/marchant-order.js
const app = getApp();
const util = require('../../utils/util.js');
const webSocket = require('../../utils/websocket.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    merchantList:[
    ],
    orderList:[
    ],
    pickDate: util.formatTime2(new Date),
    pickMerchant: "",
    pickMerchantId:null,
    orderPage:1,
    showMerchant:true//是否显示商户查询条件
  },
  bindDateChange: function (e) {
    this.setData({
      pickDate: e.detail.value
    })
    this.getOrderList(1);
  },
  bindMerchantChange:function(e){
    this.setData({
      pickMerchant: this.data.merchantList[e.detail.value].name,
      pickMerchantId: this.data.merchantList[e.detail.value].id
    })
    this.getOrderList(1);
  },
  getMerchantList: function () {//获取所有商户的id和名字
    var that = this;
    wx.request({
      url: app.globalData.questUrl + '/web/stage/manageMiniProgram/getAllDining', //仅为示例，并非真实的接口地址
      method: 'get',
      data:{
        type:1,
        token: app.globalData.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.result) {
          res.data.data.unshift({ id: '', name:'全部'})
          that.setData({
            merchantList: res.data.data,
            pickMerchant: res.data.data[0].name,
            pickMerchantId: res.data.data[0].id
          })
          that.getOrderList(1);
        } else {
          wx.showToast({
            title: res.data.message || '网络异常',
            icon: 'none'
          })
        }
      }
    })
  },
  getOrderList: function (type) {//商户订单列表 1清空2添加
    var that = this;
    if(type == 1){
      this.data.orderPage = 1;
    }
    wx.request({
      url: app.globalData.questUrl + '/web/stage/manageMiniProgram/merchantOrders', //仅为示例，并非真实的接口地址
      method: 'get',
      data: {
        pageNo: this.data.orderPage,
        merchantId: this.data.pickMerchantId || '',
        from: this.data.pickDate,
        to: this.data.pickDate,
        token: app.globalData.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.result) {
          var data = res.data.data.entitiesInPage;
          data.forEach(function(v){
            v.price = v.price.toFixed(2);
          })
          that.setData({
            orderList: type == 1 ? (that.data.orderList = data) : that.data.orderList.concat(data)
          })
        } else {
          wx.showToast({
            title: res.data.message || '网络异常',
            icon: 'none'
          })
        }
      }
    })

  },
  orderClick: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var orderId = this.data.orderList[index].id;
    if (orderId) {
      wx.navigateTo({
        url: '../merchant-order-detail/merchant-order-detail?orderId=' + orderId
      })
    }
  },
  onSocketMessageCallback: function (msg) {
    console.log(msg)
    var webData = JSON.parse(event.data);
    this.setData({
      orderList: this.data.orderList.unshift(webData)
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.orderPage = this.data.orderPage+1;
    this.getOrderList(2);
  },
  onLoad: function (opt) {
    if (app.globalData.userKind.kind == 3 && app.globalData.userKind.type == 1) {
      this.setData({
        showMerchant: false
      })
      this.getOrderList(1);
    }else{
      this.getMerchantList();
    }

    webSocket.connectSocket({ socketUrl: app.globalData.sucketUrl});
    webSocket.onSocketMessageCallback = this.onSocketMessageCallback;

  },
  onUnload: function (options) {
    webSocket.closeSocket();
  }
})