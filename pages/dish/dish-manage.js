// pages/dish/dish-manage.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dishLibraryId:null,
        navList: [{
                name: '添加菜品',
                icon: '/image/add-icon2.png',
                event: 'dishAdd',
            },
            {
                name: '批量上架',
                icon: '/image/up-icon.png',
                event: 'dishUp',
            },
            {
                name: '批量下架',
                icon: '/image/down-icon.png',
                event: 'dishDown',
            },
            {
                name: '移动菜品',
                icon: '/image/move-icon.png',
                event: 'dishMove',
            },
            {
                name: '添加目录',
                icon: '/image/addtype-icon.png',
                event: 'typeAdd',
            },
        ],
        typeList: [],
        dishList: [],
        showNav: false,
        typeId: 0,
        checkedList: [],
        multipleSelect: false,
        handleType: 0, //1上架2下架3移动
        curPage:1,
        pageSize:0,
        showMove:false,
        moveTypeId:0,
        searchKeyWord:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var typeList = [],
            dishList = [];
        for (var i = 1; i < 11; i++) {
            typeList.push({
                id: i,
                name: '分类' + i
            })
            dishList.push({
                dishId: i,
                dishName: '菜品' + i,
                dishHeaderUrl: "http://gw.alicdn.com/bao/uploaded/i3/725677994/O1CN01y8FvDU28vIhUB8VZf_!!0-item_pic.jpg",
                dishPrice: 12,
                dishPutaway: true
            })
        }
        this.setData({
            typeList,
            dishList,
            dishLibraryId:options.id
        })
    },
    onShow(){
        this.getDishType()
    },
    dishAdd() {
        wx.navigateTo({
          url: 'dish-add',
        })
    },
    dishUp() {
        let flag = this.data.handleType != 1 || !this.data.multipleSelect
        this.setData({
            multipleSelect: flag,
            checkedList: [],
            handleType: 1,
            showNav:false
        })
    },
    dishDown() {
        let flag = this.data.handleType != 2 || !this.data.multipleSelect
        this.setData({
            multipleSelect: flag,
            checkedList: [],
            handleType: 2,
            showNav:false
        })
    },
    dishMove() {
        let flag = this.data.handleType != 3 || !this.data.multipleSelect
        this.setData({
            multipleSelect: flag,
            checkedList: [],
            handleType: 3,
            showNav:false
        })
    },
    typeAdd() {
        wx.navigateTo({
          url: 'dish-addtype?dishLibraryId='+this.data.dishLibraryId,
        })
    },
    toggleNav() {
        this.setData({
            showNav: !this.data.showNav
        })
    },
    checkItem(e) {
        let id = e.currentTarget.dataset.id
        let idx = this.data.checkedList.indexOf(id)
        if (idx > -1) {
            this.data.checkedList.splice(idx, 1)
        } else {
            this.data.checkedList.push(id)
        }
        this.setData({
            checkedList: this.data.checkedList
        })
    },
    changePutaway(e) {
        let index = e.currentTarget.dataset.index
        let flag = e.currentTarget.dataset.flag
        let temp = 'dishList[' + index + '].putawayFlag'
        let that = this
        wx.showModal({
            title: '提示',
            content: '确认'+(flag?'下架':'上架')+'菜品？',
            success(res) {
                if (res.confirm) {
                    app.ajax('post','/dish/switchPutaway',{
                        dishLibraryId:that.data.dishLibraryId,
                        ids:[]
                    })
                    that.setData({
                        [temp]: !flag
                    })
                }
            }
        })  
    },
    initCheckList(){
        this.setData({
            multipleSelect: false,
            checkedList: [],
            handleType: 0
        })
    },
    dishMultipleDown(){
        var that = this
        var checkList = this.data.checkedList
        var dishList = this.data.dishList
        if(this.data.checkedList.length === 0){
            wx.showToast({
                title: '请先选择菜品',
                icon: 'none'
            })
            return
        }
        wx.showModal({
            title: '提示',
            content: '确认下架菜品？',
            success(res) {
                if (res.confirm) {
                    dishList.forEach(v=>{
                        if(checkList.indexOf(v.id)>-1){
                            v.putawayFlag = false
                        }
                    })
                    that.setData({
                        dishList 
                    })
                }
                that.initCheckList()
            }
        })
    },
    dishMultipleUp(){
        var that = this
        var checkList = this.data.checkedList
        var dishList = this.data.dishList
        if(this.data.checkedList.length === 0){
            wx.showToast({
                title: '请先选择菜品',
                icon: 'none'
            })
            return
        }
        wx.showModal({
            title: '提示',
            content: '确认上架菜品？',
            success(res) {
                if (res.confirm) {
                    dishList.forEach(v=>{
                        if(checkList.indexOf(v.id)>-1){
                            v.putawayFlag = true
                        }
                    })
                    that.setData({
                        dishList 
                    })
                }
                that.initCheckList()
            }
        })
    },
    dishMultipleMove(){
        if(this.data.checkedList.length === 0){
            wx.showToast({
                title: '请先选择菜品',
                icon: 'none'
            })
            return
        }
        this.setData({
            showMove:true
        })
    },
    getDishType(){
        app.ajax('get','/dishType/dishTypes',{dishLibraryId:this.data.dishLibraryId})
        .then(res=>{
            this.setData({
                typeList:res.data
            })
            this.getDishList()
        })
        .catch(res=>{
            wx.showToast({
                title: res.message || '网络异常',
                icon: 'none'
            })
        })
    },
    getDishList(){
        app.ajax('get','/dish/dishList',{
            pageNo:this.data.curPage,
            dishLibraryId:this.data.dishLibraryId,
            dishTypeId:this.data.typeId,
            dishName:this.data.searchKeyWord
        })
        .then(res=>{
            let data;
            if(this.data.curPage==1){
                data=res.data.entitiesInPage
            }else{
                data=this.data.dishList.concat(res.data.entitiesInPage)
            }
            this.setData({
                dishList:data,
                pageSize:res.data.pagesSize
            })
        })
        .catch(res=>{
            wx.showToast({
                title: res.message || '网络异常',
                icon: 'none'
            })
        })
    },
    getNewPage(){
        if(this.data.curPage<this.pageSize){
            this.data.curPage++
            this.getDishList()
        }
    },
    toEdit(e){
        wx.navigateTo({
          url: 'dish-add?id='+e.currentTarget.dataset.id,
        })
    },
    changeType(e){
        var typeId = e.currentTarget.dataset.id
        this.setData({
            typeId
        })
    },
    changeMoveType(e){
        var moveTypeId = e.currentTarget.dataset.id
        this.setData({
            moveTypeId
        })
    },
    closeMove(){
        this.setData({
            showMove:false
        })
    },
    moveConfirm(){
        console.log(this.data.checkedList,this.data.moveTypeId)
        app.ajax('post','/dish/move',{
            dishLibraryId:this.data.dishLibraryId,
            ids:this.data.checkedList,
            typeId:this.data.moveTypeId
        })
        .then(res=>{
            this.setData({
                showMove:false,
                moveTypeId:0,
                curPage:1,
            },()=>{
                this.getDishList()
            })
        })
        .catch(res=>{
            wx.showToast({
                title: res.message || '网络异常',
                icon: 'none'
            })
        })
    },
    searchChange(e){
        console.log(e)
        this.setData({
            searchKeyWord:e.detail
        })
        this.getDishList()
    }
})