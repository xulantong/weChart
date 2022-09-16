import config from "./config"

const {baseUrl} = config

export default (url, data = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            data,
            method,
            success: (res) => {
                if (data.isLogin) {
                }
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
        })
    })

}