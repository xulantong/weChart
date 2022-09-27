import config from "./config"

const {baseUrl} = config

export default (url, data = {}, config, method = 'GET') => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            data,
            method,
            ...config,
            header: {cookie: wx.getStorageSync("cookies") || ""},
            success: (res) => {
                if (data.isLogin) {
                    wx.setStorageSync("cookies", res.cookies.find(item => item.includes("MUSIC_U")))
                }
                // console.log(res)
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })

}