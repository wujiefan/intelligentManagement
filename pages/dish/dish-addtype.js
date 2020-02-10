// pages/dish/dish-addtype.js
import WxValidate from "../../utils/WxValidate.js"
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dishLibraryId:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            dishLibraryId:options.dishLibraryId
        })
        this.initValidate()
    },
    initValidate() {
        const rules = {
            name: {
                required: true,
            },
        }
        const messages = {
            name: {
                required: '请输入目录名称',
            },
        };
        this.WxValidate = new WxValidate(rules, messages)
    },
    formSubmit(e){
        let params = e.detail.value;
        console.log(params)
        let that = this;
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0]
            wx.showModal({
                content: error.msg,
                showCancel: false,
            })
        }else{
            app.ajax('post','/dishType/create',{
                dishLibraryId:this.data.dishLibraryId,
                name:params.name
            })
            .then(res=>{
                wx.navigateBack()
            })
            .catch(res=>{
                wx.showToast({
                    title: res.message || '网络异常',
                    icon: 'none'
                })
            })
        }
    }
})