//0 引入用来发送请求的方法 一定要把路径补全
import { request } from "../../request/index.js"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //轮播图数组
        swiperList: [],
        //导航 数组
        catesList: [],
        //楼层数据
        floorList: [],
    },
    //页面开始加载  就会触发
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //1 发送异步请求获取轮播图数据
        //优化的手段可以通过es6的 promise来解决这个问题
        //    wx.request({
        //        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //        success: (result) => {
        //            this.setData({
        //                swiperList: result.data.message
        //            })
        //        }
        //    })
        this.getSwiperList();
        this.getcateList();
        this.getfloorList()
    },
    //获取轮播图数据
    getSwiperList() {
        request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
            .then(result => {
                this.setData({
                    swiperList: result
                });
                result.forEach((v, i) => { result[i].navigator_url = v.navigator_url.replace('main', 'index'); });

            })
    },
    //获取分类导航数据
    getcateList() {
        request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
            .then(result => {
                this.setData({
                    cateList: result
                })
            })
    },
    //获取 楼层数据
    getfloorList() {
        request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata" })
            .then(result => {
                this.setData({
                    floorList: result
                })
            })
    },
    handlenonono() {
        wx.showToast({
            title: '别点了，没用',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    onPageScroll: function() {},
    //item(index,pagePath,txt)
    onTabItemTap: function(item) {}
})