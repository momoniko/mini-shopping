/**
 * 1 页面被打开的时候 onShow
 *    0 onShow 不同于onLoad 无法在形参上接收options参数
 *    0.5 判断缓存中有没有token
 *      1 没有 直接跳转到授权页面
 *      2 有 直接往下进行
 *    1 获取url 上的参数type
 *    2 根据type 来决定页面标题的数组元素 哪个被激活选中
 *    2 根据type 去发送请求获取订单数据
 *    3 渲染页面
 * 2 点击不同的标题 重新发送请求来获取和渲染数据
 */
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "全部",
                isActive: true
            },
            {
                id: 1,
                value: "代付款",
                isActive: false
            },
            {
                id: 2,
                value: "代发货",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ],
    },
    onShow(options) {
        // 1 获取当前的小程序页面栈-数组 长度最大是10页面
        let pages = getCurrentPages();
        // 2 数组中 索引最大的页面就是当前页面
        let currentPage = pages[pages.length - 1];
        // 3 获取url 上的type参数
        const { type } = currentPage.options;
        // 4 激活选中页面的标题 当type=1 index=0
        this.changeTitleByIndex(type - 1)
        this.getOrders(type);
    },
    //获取订单列表的方法
    async getOrders(type) {
        wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
        const token = wx.getStorageSync("token")
        const header = { Authorization: token };
        const res = await request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all", method: "GET", header: header, data: { type } })
        this.setData({
            orders: res.orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        })
    },
    //根据标题索引来激活选中 标题数组
    changeTitleByIndex(index) {
        //2 修改源数组 
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        // 3 赋值到data中
        this.setData({
            tabs
        })
    },
    handleTabsItemChange(e) {
        // 1 获取被点击的标题索引
        const { index } = e.detail;
        this.changeTitleByIndex(index);
        // 2 重新发送请求 type=1 index=0
        this.getOrders(index + 1)
    }
})