// pages/member/member-manage.js
var memberData = JSON.parse('[{"id":1133,"memberName":"13222222222","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"13222222222","increment":9090.00,"givechargeNum":0.00,"sumMoney":9090.00,"operatorEmployeeName":"测试","rechargeTime":"2019-11-22 14:05:39","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1132,"memberName":"13111111111","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"13111111111","increment":99999.00,"givechargeNum":0.00,"sumMoney":99999.00,"operatorEmployeeName":"测试","rechargeTime":"2019-11-21 10:45:33","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1127,"memberName":"黄紫玲","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"15779988412","increment":100.00,"givechargeNum":0.00,"sumMoney":100.00,"operatorEmployeeName":"测试","rechargeTime":"2019-08-05 14:21:29","departmentEmployeeName":null,"organizationName":"2","type":null},{"id":1126,"memberName":"测试环境","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"18300707756","increment":100.00,"givechargeNum":0.00,"sumMoney":100.00,"operatorEmployeeName":"测试","rechargeTime":"2019-08-05 14:21:29","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1125,"memberName":"李愚修","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"13705737876","increment":100.00,"givechargeNum":0.00,"sumMoney":100.00,"operatorEmployeeName":"测试","rechargeTime":"2019-08-05 14:21:29","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1124,"memberName":"王蝶玲","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"17774000506","increment":100.00,"givechargeNum":0.00,"sumMoney":100.00,"operatorEmployeeName":"测试","rechargeTime":"2019-08-05 14:21:29","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1123,"memberName":"csh","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"15890039520","increment":100.00,"givechargeNum":0.00,"sumMoney":100.00,"operatorEmployeeName":"测试","rechargeTime":"2019-08-05 14:21:29","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1110,"memberName":"测试环境","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"18300707756","increment":10000.00,"givechargeNum":0.00,"sumMoney":10000.00,"operatorEmployeeName":"测试","rechargeTime":"2019-04-24 10:48:24","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1054,"memberName":"李愚修","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"13705737876","increment":20000.00,"givechargeNum":0.00,"sumMoney":20000.00,"operatorEmployeeName":"测试","rechargeTime":"2019-03-27 20:57:53","departmentEmployeeName":null,"organizationName":"测试单位","type":null},{"id":1052,"memberName":"王蝶玲","departmentName":null,"cardId":null,"membershipNumber":null,"telno":"17774000506","increment":20000.00,"givechargeNum":0.00,"sumMoney":20000.00,"operatorEmployeeName":"测试","rechargeTime":"2019-03-27 18:01:29","departmentEmployeeName":null,"organizationName":"测试单位","type":null}]')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        memberList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            memberList:memberData
        })
    },

})