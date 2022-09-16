import request from "../../utils/request";

let startY = 0
let moveY = 0
let moveDistance = 0
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        coverTransform: "translateY(0)",
        coveTransition: "",
        recentPlayList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync("userInfo")
        if (userInfo) {
            this.setData({
                userInfo: JSON.parse(userInfo)
            })
            this.getRecentPlayList(this.data.userInfo.userId)
        }

    },
    async getRecentPlayList(uid, type = 0) {
        let recentPlayList = await request("/user/record", {uid, type})
        this.setData({
            recentPlayList: recentPlayList.allData.slice(0, 10).map((item, index) => {
                item.id = index
            })
        })

    },
    handleTouchStart(event) {
        startY = event.touches[0].clientY
        this.setData({
            coveTransition: ""
        })
    },
    handleTouchMove(event) {
        moveY = event.touches[0].clientY
        moveDistance = moveY - startY
        if (moveDistance < 0) return
        if (moveDistance > 80) moveDistance = 80
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`,
        })

    },
    handleTouchEnd(event) {
        this.setData({
            coverTransform: `translateY(0)`,
            coveTransition: "transform 1s ease"
        })
    },
    toLogin() {
        wx.navigateTo({
            url: "/pages/login/login"
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})