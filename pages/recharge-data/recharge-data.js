// pages/turnover/turnover.js
const util = require('../../utils/util.js')
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

let barChartLine;

function getBarOption() {
    return {
        color: ['#5581FE'],
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
        },
        xAxis: [{
            show:false,
        }],
        yAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                color: '#666'
            }
        }],
        series: [{
                name: '营业额',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: [300, 270, 340, 344, 300, 320, 310]
            },
        ]
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
            '按支付方式',
            '按餐点',
        ],
        departmentIndex: 0,
        searchActive: 0,
        date: util.formatTime3(new Date()),
        ecBarLine: {
            onInit: function (canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                barChartLine = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(barChartLine);
                barChartLine.setOption(getBarOption());
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