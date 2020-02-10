//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    timeNow: '',  // 日期
    dining: [],  // 食堂数据
    diningId:0,// 食堂id
    pageNo:1,
    pagesSize:0,
    totalPages:0,
    listData: [],
    isShow:''
  },
  //事件处理函数
  getDepartments:function(){
    var that = this;
    wx.request({
      url: app.globalData.questUrl + '/web/stage/manageMiniProgram/getAllDining',
      data: {
        type: 0,
        token: app.globalData.token
      },
      method:'get',
      success:function(res){
        
        if (res.data.result) {
          res.data.data.unshift({ id: '', name: "全部" });
          that.setData({
            dining: res.data.data,
            diningId: 0
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },
  getNow:function(){ // 获取当前日期
    let now = new Date();
    let y = now.getFullYear();
    let mo = now.getMonth()+1;   
    let d = now.getDate();
    this.setData({
      timeNow :[y, mo, d].map((i, item) => { return i < 9 ? ('0' + i) : i; }).join('-')
    })
  },
  getListData:function(){ // 获取订单列表数据
    var that = this;
    wx.request({
      url: app.globalData.questUrl + '/web/stage/manageMiniProgram/offlineOrders?pageNo=' + that.data.pageNo + '&diningId=' + (that.data.dining.length>0?that.data.dining[that.data.diningId].id:'') + '&from=' + that.data.timeNow + '&to=' + that.data.timeNow+'&token='+app.globalData.token, 
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.result){
          that.setData({
            totalPages: res.data.data.pagesSize,
            listData: res.data.data.entitiesInPage
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },

  // 下拉刷新
  onReachBottom: function () {
    // 显示顶部刷新图标
    var that = this;
    if (that.data.pageNo < that.data.totalPages){
      that.setData({
        pageNo: ++that.data.pageNo
      });
      that.getListData();
    }
    
    
  },
  toDetail(e){
    // 跳转到详情页
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../online-order-detail/online-order-detail?id=' + id,
    })
  },
  bindDateChange:function(e){  // 选择日期
    this.setData({
      timeNow: e.detail.value
    })
    this.getListData();
  },
  bindCanteenChange:function(e){ //选择食堂
    this.setData({
      diningId:Number(e.detail.value)
    })
    this.getListData();
  },
  onshow:function(){
    
  },
  onLoad:function(){
    let isShowInfo = app.globalData.userKind.kind == 5 ? true : false;
    this.setData({
      isShow: isShowInfo
    })
    this.getNow();
    
    if (this.data.isShow){
      this.getDepartments();
    }
    
    this.getListData();
  }
})
