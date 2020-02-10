// pages/equipment/equipment-list.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentList:[],
    canteenList: [],
    canteenIndex:0,
    status:['启用','停用','故障'],
    statusIndex:0,
    showDialog:false,
    curId:'',
    curCanteen:'',
    userKind:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userKind: app.globalData.userKind
    })
    if(this.data.userKind.kind == 5){
      this.getCanteenList();
    }
    this.getEquipmentList();
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  getEquipmentList(){
    app.ajax('get','/web/stage/manageMiniProgram/getAllEquipment',{pageNo:1}).then(res=>{
      if(res.result){
        this.setData({
          equipmentList: res.data
        })
        if (this.data.userKind.kind != 5){
          this.data.canteenList.push({ id: res.data[0].diningId})
        }
      }else{
        app.showError(res.message)
      }
    })
  },
  getCanteenList(){
    app.ajax('get', '/web/stage/manageMiniProgram/getAllDining', {type:0}).then(res=>{
      if (res.result) {
        this.setData({
          canteenList: res.data
        })
      } else {
        app.showError(res.message)
      }
    })
  },
  toEdit(e){
    this.setData({
      showDialog:true,
      curId:e.currentTarget.dataset.id,
      statusIndex:e.currentTarget.dataset.status,
      canteenIndex: this.getCanteenIndex(e.currentTarget.dataset.dining),
      curCanteen: e.currentTarget.dataset.dining
    })
  },
  cancel(){
    this.setData({
      canteenIndex: 0,
      statusIndexL: 0,
      showDialog: false,
    })
  },
  canteenChange(e) {
    this.setData({
      canteenIndex:e.detail.value
    })
  },
  statusChange(e){
    this.setData({
      statusIndex: e.detail.value
    })
  },
  confirm(){
    app.ajax('post','/web/stage/manageMiniProgram/modifyEquipment',{
      diningId: this.data.canteenList[this.data.canteenIndex].id,
      id: this.data.curId,
      status: this.data.statusIndex
    }).then(res=>{
      if(res.result){
        app.showError('操作成功')
        this.cancel();
        this.getEquipmentList();
      }else{
        app.showError(res.message)
      }
    })
  },
  getCanteenIndex(name){
    for(var i=0;i<this.data.canteenList.length;i++){
      if (name == this.data.canteenList[i].name)
        return i
    }
    return 0
  }
})