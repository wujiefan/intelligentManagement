//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    departmentList:[
      {
        id:1,
        name:'单位1'
      },
      {
        id:2,
        name:'单位2'
      },
      {
        id:3,
        name:'单位3'
      },
    ],
    navList:[//type 1单位 2食堂 3都要
      {
        id:1,
        name:'餐厅管理',
        icon:'/image/nav-icon1.png',
        link:'',
        type:1
      },
      {
        id:2,
        name:'用户管理',
        icon:'/image/nav-icon2.png',
        link:'',
        type:1
      },
      {
        id:3,
        name:'设备管理',
        icon:'/image/nav-icon3.png',
        link:'',
        type:1
      },
      {
        id:4,
        name:'菜品管理',
        icon:'/image/nav-icon4.png',
        link:'../dish/dish-library',
        type:2
      },
      {
        id:5,
        name:'会员管理',
        icon:'/image/nav-icon5.png',
        link:'',
        type:1
      },
      {
        id:6,
        name:'订单管理',
        icon:'/image/nav-icon6.png',
        link:'',
        type:2
      },
    ],
    departmentIndex:0,
  },
  onLoad: function () {
    
  },
  departmentChange(e){
    console.log(e)
    this.setData({
      departmentIndex:e.detail.value
    })
  },
})