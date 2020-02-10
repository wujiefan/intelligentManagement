// pages/dish/dish-add.js
import WxValidate from "../../utils/WxValidate.js"
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dishId:null,
        dishInfo: {},
        checkboxItems: [{
                value: 'autoSettle',
                name: '自助结算',
                id: 0
            },
            {
                value: 'offlineSettle',
                name: '线下结算',
                id: 1
            },
            {
                value: 'onlineReserve',
                name: '线上预订',
                id: 2
            },
            {
                value: 'fastSettle',
                name: '快速结算',
                id: 3
            },
        ],
        showImages: [],
        recognitionImages: [],
        mealType:[
            {
                name:'早餐',
                value:'0'
            },
            {
                name:'中餐',
                value:'1'
            },
            {
                name:'晚餐',
                value:'2'
            },
        ],
        mealTypeIndex:'0'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initValidate();
        if(options.id){
            this.setData({
                dishId:options.id
            })
            this.getDishDetail()
        }
         
    },
    checkboxChange: function (e) {
        var items = this.data.checkboxItems;
        var ids = e.detail.value
        for (var y = 0; y < items.length; y++) {
            if (ids.indexOf(items[y].value) != -1) {
                items[y].checked = true;
            } else {
                items[y].checked = false;
            }
        }
        this.setData({
            checkboxItems: items
        });
    },
    chooseImage(e) {
        var that = this;
        var type = e.currentTarget.dataset.type
        wx.chooseImage({
            sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res)
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: app.globalData.questUrl + '/image/upload',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        type: 501
                    },
                    success(res) {
                        const data = JSON.parse(res.data)
                        console.log(data)
                        if(data.result){
                            let showImages = that.data[type]
                            showImages.push(data.data)
                            that.setData({
                                [type]:showImages
                            })
                            console.log(that.data[type])
                        }else{
                            wx.showToast({
                                title: data.message || '网络异常',
                                icon: 'none'
                            })
                        }
                    }
                })
            }
        })
    },
    initValidate() {
        /*** 4-2(配置规则)*/
        const rules = {
            dishName: {
                required: true,
            },
            dishPrice: {
                required: true,
            },
            dishType: {
                required: true,
            },
        }
        const messages = {
            dishName: {
                required: '请输入菜品名称',
            },
            dishPrice: {
                required: '请输入菜品价格',
            },
            dishType: {
                required: '请选择结算类型',
            },
        };
        this.WxValidate = new WxValidate(rules, messages)
        // this.WxValidate.addMethod('isTel', (value, param) => {
        //   return /^1\d{10}$/.test(value)
        // }, '请输入正确的手机号')
    },
    formSubmit(e) {
        let params = e.detail.value;
        let that = this;
        console.log(params)
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0]
            wx.showModal({
                content: error.msg,
                showCancel: false,
            })
        } else {
            var data={
                autoSettle:false,
                offlineSettle:false,
                onlineReserve:false,
                fastSettle:false,
            }
            params.dishType.forEach(v=>{
                data[v]=true
            })
            delete params.dishType
            Object.assign(data,params)
            data.displayImages=this.data.showImages.map(v=>{
                return v.id
            })
            data.offlineImages=this.data.recognitionImages.map(v=>{
                return v.id
            })
            console.log(data)
        }
    },
    mealTypeChange(e){
        this.setData({
            mealTypeIndex: e.detail.value
        })
    },
    getDishDetail(){
        ajax('get','/dish/detail',{dishId:this.data.dishId})
        .then(res=>{
            console.log(res)
        })
        .catch(res=>{
            wx.showToast({
                title: res.message || '网络异常',
                icon: 'none'
            })
        })
    }
})