// pages/recommendSong/recommendSong.js
import request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: "",
        month: "",
        recommendList: [],
        recommendReason: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (wx.getStorageSync('userInfo')) {
            this.getRecommendList()
        } else {
            wx.showToast({
                title: "请先登录",
                icon: "error",
                success: () => {
                    wx.reLaunch({
                        url: "/pages/login/login"
                    })
                }
            })

        }
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })
    },
    async getRecommendList() {
        let recommendListData = await request("/recommend/songs")
        this.setData({
            recommendList: recommendListData.data.dailySongs,
            recommendReason: recommendListData.data.recommendReasons[0].reason
        })
    },
    toSongDetail(event) {
        wx.navigateTo({
            url: "/pages/songDetail/songDetail?id=" + JSON.stringify(event.currentTarget.dataset.id),
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