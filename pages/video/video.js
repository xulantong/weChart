// pages/video/video.js
import request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [],
        videoGroup: {},
        navId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getVideoGroupList()
    },
    async getVideoGroupList() {
        let videoGroupListData = await request("/video/group/list")
        this.setData({videoGroupList: videoGroupListData.data.slice(0, 14), navId: videoGroupListData.data[0].id})
        this.getVideoGroup(this.data.navId)
    },
    async getVideoGroup(id) {
        let videoGroupData = await request("/video/group", {id})
        // this.setData({
        //     videoGroup:""
        // })
    },
    changeNav(event) {
        this.setData({navId: event.currentTarget.id})
        this.getVideoGroup(this.data.navId)
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