/**
 * promise 形式 getSetting
 */
export const getSetting = () => {
        return new Promise((resolve, reject) => [
            wx.getSetting({
                complete: (res) => {},
                fail: (err) => {
                    reject(err)
                },
                success: (result) => {
                    resolve(result);
                },
            })
        ])
    }
    /**
     * promise 形式 chooseAddress
     */
export const chooseAddress = () => {
        return new Promise((resolve, reject) => {
            wx.chooseAddress({
                complete: (res) => {},
                fail: (err) => {
                    reject(err)
                },
                success: (result) => {
                    resolve(result);
                },
            })
        })
    }
    /**
     * promise 形式 openSetting
     */
export const openSetting = () => {
        return new Promise((resolve, reject) => {
            wx.openSetting({
                complete: (res) => {},
                fail: (err) => {
                    reject(err)
                },
                success: (result) => {
                    resolve(result);
                },
            })
        })
    }
    /**
     * promise 形式 showModal
     * @param {object} params0 参数 
     */
export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }

        })
    })
}

export const showToast = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }

        })
    })
}

export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            fail: (err) => {
                reject(err)
            },
            success: (result) => {
                resolve(result);
            },
            timeout: 10000,
        })
    })
}

/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay  支付所必要的参数
 */
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            fail: (err) => {
                reject(err);
            },
            success: (result) => {
                resolve(result);
            },
        })
    })
}