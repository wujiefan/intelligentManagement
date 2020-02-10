// pages/dish/dish-library.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dishLibraryList:[
            {
                id:1,
                name:'快鱼菜品库',
                dishNumber:100,
                equipment:2
            }
        ],
        isTouchMove: false,
        startX:0,
        startY:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDishLibraryList()
    },
    touchstart: function (e) {
        // this.data.dishLibraryList.forEach(function (v, i) {
        //     if (v.isTouchMove) 
        //         v.isTouchMove = false;
        // })
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            dishLibraryList: this.data.dishLibraryList
        })
    },
    touchmove: function (e) {
        var that = this,
            index = e.currentTarget.dataset.index, //当前索引
            startX = that.data.startX, //开始X坐标
            startY = that.data.startY, //开始Y坐标
            touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
            //获取滑动角度
            angle = that.angle({
                X: startX,
                Y: startY
            }, {
                X: touchMoveX,
                Y: touchMoveY
            });
        that.data.dishLibraryList.forEach(function (v, i) {
            v.isTouchMove = false
            //滑动超过30度角
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) //右滑
                    v.isTouchMove = false
                else //左滑
                    v.isTouchMove = true
            }
        })
        that.setData({
            dishLibraryList: that.data.dishLibraryList
        })
    },
    angle: function (start, end) {
        var dX = end.X - start.X,
            dY = end.Y - start.Y
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(dY / dX) / (2 * Math.PI);
    },
    getDishLibraryList(){
        app.ajax('get','/dishLibrary/dishLibraryList')
        .then(res=>{
          this.setData({
            dishLibraryList:res.data
          })
        })
        .catch(res=>{
            wx.showToast({
                title: res.message || '网络异常',
                icon: 'none'
            })
        })
    },
    removeItem(e){
        console.log(e)
        var dishLibrary={
            dishLibraryId:e.currentTarget.dataset.id,
            dishLibraryName:e.currentTarget.dataset.name
        }
        app.ajax('post',"/dishLibrary/deleteDishLibrary",{dishLibraryList:[dishLibrary]})
        .then(res=>{
            this.getDishLibraryList()
        })
        .catch(res=>{
            wx.showToast({
                title: res.message || '网络异常',
                icon: 'none'
            })
        })
    },
    editItem(e){
        wx.navigateTo({
            url: 'dish-manage?id='+e.currentTarget.dataset.id,
        })
    },
})