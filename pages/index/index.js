import request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],
        recommendList: [],
        topList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let bannerListData = await request("/banner", {type: 2})
        this.setData({bannerList: bannerListData.banners})
        let recommendListData = await request("/personalized", {limit: 10})
        this.setData({recommendList: recommendListData.result})
        let topListData = await request("/toplist/detail", {})
        this.setData({topList: topListData.list.slice(0, 4)})

    },
    toRecommend() {
        wx.navigateTo({
            url: "/pages/recommendSong/recommendSong"
        })
    },
    toGetInfo(){
        wx.navigateTo({
            url: "/pages/getInfo/getInfo"
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