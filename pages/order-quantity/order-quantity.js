const util = require('../../utils/util.js')
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

let pieChartLine;

function getPieOption() {
    return {
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'], //半径
            avoidLabelOverlap: true, //防重叠
            label: {
                show: true,
                position: 'outside',
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data: [{
                    value: 335,
                    name: '直接访问'
                },
                {
                    value: 310,
                    name: '邮件营销'
                },
                {
                    value: 234,
                    name: '联盟广告'
                },
                {
                    value: 135,
                    name: '视频广告'
                },
                {
                    value: 1548,
                    name: '搜索引擎'
                },
            ]
        }]
    }
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        departmentList: [{
                id: 1,
                name: '单位1'
            },
            {
                id: 2,
                name: '单位2'
            },
            {
                id: 3,
                name: '单位3'
            },
        ],
        searchLit: [
            '按设备',
            '按餐点',
        ],
        departmentIndex: 0,
        searchActive: 0,
        date: util.formatTime3(new Date()),
        ecPieLine: {
            onInit: function (canvas, width, height) {
                console.log(333)
                pieChartLine = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(pieChartLine);
                pieChartLine.setOption(getPieOption());
            }
        },
        trendTypeList: [
            '日',
            '月',
            '年',
        ],
        trendTypeIndex: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    departmentChange(e) {
        this.setData({
            departmentIndex: e.detail.value
        })
    },
    searchChange(e) {
        this.setData({
            searchActive: e.currentTarget.dataset.index
        })
    },
    dateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    trendTypeChange(e) {
        console.log(e)
        this.setData({
            trendTypeIndex: e.detail.value
        })
    }
})