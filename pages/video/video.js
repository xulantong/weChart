// pages/video/video.js
import request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [],
        videoList: [],
        isTriggered: false,
        navId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (wx.getStorageSync('userInfo')) {
            this.getVideoGroupList()
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
    },
    async getVideoGroupList() {
        let videoGroupListData = await request("/video/group/list")
        this.setData({videoGroupList: videoGroupListData.data.slice(1, 15), navId: videoGroupListData.data[1].id})
        this.getVideoGroup(videoGroupListData.data[1].id)

    },
    async getVideoGroup(id) {
        let videoListData = await request("/video/group", {id})
        let urlList = []
        await Promise.all(videoListData.datas.map(async item => {
            let result = await request('/video/url', {id: item.data.vid})
            return result.urls[0]
        })).then(res => {
            urlList = res
        })
        this.setData({
            videoList: videoListData.datas.map((item, index) => {
                item.id = index
                item.data.urlInfo = urlList[index]
                return item
            }),
            isTriggered: false
        })
        wx.hideLoading()

    },
    changeNav(event) {
        this.setData({navId: event.currentTarget.id, videoList: []})
        wx.showLoading({
            title: "加载中"
        })
        this.getVideoGroup(this.data.navId)
    },
    handlePlay(event) {
        this?.vId !== event.currentTarget.id && this.videoContext && this.videoContext.stop()
        this.vId = event.currentTarget.id
        this.videoContext = wx.createVideoContext(this.vId)
    },
    handleScrollRefresh() {
        this.getVideoGroup(this.data.navId)
    },
    handleClickSearch(){
      wx.navigateTo({
          url:"/pages/search/search"
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
    onShareAppMessage({from, target}) {
        if (from === 'button') {
            console.log(target)
            let {title, path} = target.dataset
            return {
                title,
                path,
                imageUrl: '/static/images/avatar.png'
            }
        }
    }
})