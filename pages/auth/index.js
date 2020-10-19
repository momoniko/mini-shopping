import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js'
import { login } from "../../utils/asyncWx.js";
Page({
    //"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo",
    // 获取用户信息
    async handleGetUserInfo(e) {
        try {
            //console.log(e);
            // 1 获取用户信息
            const { encryptedData, rawData, iv, signatrue } = e.detail;
            // 2 获取小程序登录成功后的code
            const { code } = await login();
            const loginParams = { encryptedData, rawData, iv, signatrue, code };
            //console.log(code)
            // 3 发送请求 获取用户的token
            const res = await request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin", data: loginParams, method: "post" })
                //console.log(res)
                // 4 把 token 存入缓存中 同时跳转回上一个页面
            wx.setStorageSync('token', token);
            wx.navigateBack({
                detail: 1
            });
        } catch (error) {
            console.log(error);
        }
    },
    onShow(options) {
        let pages = getCurrentPages()
        let currentpage = pages[pages.length - 1].options
        console.log(currentpage)
        const { type } = currentpage
        wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
        const token = wx.getStorageSync("token")
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            });
            return
        }
    },
})