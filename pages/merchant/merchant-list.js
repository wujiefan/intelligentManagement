let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDiningList()
  },
  toAdd() {
    wx.navigateTo({
      url: 'merchant-detail',
    })
  },
  toEdit(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'merchant-detail?id=' + id,
    })
  },
  getDiningList() {
    app.ajax('get', '/web/stage/manageMiniProgram/getAllDining', { type: 1 }).then(res => {
      if (res.result) {
        this.setData({
          merchantList: res.data
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