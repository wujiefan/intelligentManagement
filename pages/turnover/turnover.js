// pages/turnover/turnover.js
const util = require('../../utils/util.js')
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

let barChartLine;
let pieChartLine;
let data = JSON.parse('[{"dateCoordinate":"01-01","turnover":0.00},{"dateCoordinate":"01-02","turnover":3844.50},{"dateCoordinate":"01-03","turnover":4067.50},{"dateCoordinate":"01-04","turnover":3308.50},{"dateCoordinate":"01-05","turnover":0.00},{"dateCoordinate":"01-06","turnover":3643.50},{"dateCoordinate":"01-07","turnover":3568.05},{"dateCoordinate":"01-08","turnover":3432.50},{"dateCoordinate":"01-09","turnover":3712.50},{"dateCoordinate":"01-10","turnover":3943.50},{"dateCoordinate":"01-11","turnover":1187.50},{"dateCoordinate":"01-12","turnover":0.00},{"dateCoordinate":"01-13","turnover":3832.00},{"dateCoordinate":"01-14","turnover":3616.50},{"dateCoordinate":"01-15","turnover":3733.00},{"dateCoordinate":"01-16","turnover":799.00},{"dateCoordinate":"12-18","turnover":4750.50},{"dateCoordinate":"12-19","turnover":4133.00},{"dateCoordinate":"12-20","turnover":4406.50},{"dateCoordinate":"12-21","turnover":859.00},{"dateCoordinate":"12-22","turnover":0.00},{"dateCoordinate":"12-23","turnover":4296.00},{"dateCoordinate":"12-24","turnover":4416.11},{"dateCoordinate":"12-25","turnover":4033.50},{"dateCoordinate":"12-26","turnover":3808.00},{"dateCoordinate":"12-27","turnover":3804.00},{"dateCoordinate":"12-28","turnover":737.00},{"dateCoordinate":"12-29","turnover":0.00},{"dateCoordinate":"12-30","turnover":4009.00},{"dateCoordinate":"12-31","turnover":3742.00}]')

function getBarData(data){
    let key = [],value=[];
    data.forEach(v=>{
        key.push(v.dateCoordinate)
        value.push(v.turnover)
    })
    return {key,value}
}
function setBarOption(barData){
    barChartLine.setOption({
        yAxis: [{
            data: barData.key,
        }],
        series: [
            {
                data: barData.value
            },
        ]
    })
}
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

function getBarOption(barData={key:[],value:[]}) {
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
            show:false
        }],
        yAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            data: barData.key,
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                color: '#666'
            }
        }],
        series: [
            {
                name: '营业额',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: barData.value
            },
        ]
    }
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        barHeight:30,
        barCorrection:100,
        canteenId:null,
        searchLit: [
            '按设备',
            '按支付方式',
            '按餐点',
        ],
        departmentIndex: 0,
        searchActive: 0,
        date: util.formatTime3(new Date()),
        ecPieLine: {
            onInit: function (canvas, width, height) {
                pieChartLine = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(pieChartLine);
                pieChartLine.setOption(getPieOption());
            }
        },
        ecBarLine: {
            onInit: function (canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                barChartLine = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(barChartLine);
                // barChartLine.setOption(getBarOption());
            }
        },
        trendTypeList: [
            '日',
            '月',
            '年',
        ],
        trendTypeIndex: 0,
        barData:[],
        pieData:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        
    },
    onReady(){
        this.setData({
            barData:data,
        },()=>{
            barChartLine.setOption(getBarOption(getBarData(data)))
            barChartLine.resize({width:barChartLine.getWidth(),height:data.length*this.data.barHeight+this.data.barCorrection})
        })
    },
    searchChange(e) {
        this.setData({
            searchActive: e.currentTarget.dataset.index
        })
        this.setBarEc(data.slice(0,Math.round(Math.random()*50+1)))
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
    },
    canteenChange(e){
        console.log(e)
    },
    setBarEc(data){
        this.setData({
            barData:data
        },()=>{
            setBarOption(getBarData(data))
            barChartLine.resize({width:barChartLine.getWidth(),height:data.length*this.data.barHeight+this.data.barCorrection})
        })
    }
})