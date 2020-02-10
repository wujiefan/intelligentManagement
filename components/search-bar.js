// components/search-bar.js
const util = require('../utils/util.js')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder:String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        inputChange:util.debounce(function(e){
            this.triggerEvent('searchChange', e.detail.value)
        },500)
    }
})
