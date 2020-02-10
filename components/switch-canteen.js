// components/switch-canteen.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // isShow:{
        //     type:Boolean,
        //     value:true
        // },
    },

    /**
     * 组件的初始数据
     */
    data: {
        canteenList: [
            {
                id: 1,
                diningName: '单位1'
            },
            {
                id: 2,
                diningName: '单位2'
            },
            {
                id: 3,
                diningName: '单位3'
            },
        ],
        canteenIndex:0,
        isShow:true
    },
    lifetimes: {
        attached(){
            this.setData({
                isShow:app.globalData.userKind
            })
            this._getCanteenList()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        _getCanteenList() {
            app.ajax('get', '/department/diningList', null)
            .then(res => {
                this.setData({
                    canteenList:res.data
                })
            })
            .catch(res => {
                wx.showToast({
                    title: res.message || '网络异常',
                    icon: 'none'
                })
            })
        },
        canteenChange(e) {
            this.setData({
                canteenIndex: e.detail.value
            })
            var canteenId = this.data.canteenList[e.detail.value].id
            this.triggerEvent('canteenChange', canteenId)
        },
    }
})