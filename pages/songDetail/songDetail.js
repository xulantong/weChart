import request from "../../utils/request";
import Pubsub from "pubsub-js"

const instance = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
        ids: "",
        songDetail: {},
        songUrl: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let ids = JSON.parse(options.id)
        this.setData({
            ids
        })
        this.getMusicDetail(ids)

        if (instance.globalData.isMusicPlay && instance.globalData.id === ids) {
            this.setData({
                isPlay: true
            })
        }
        this.backgroundAudioManager = wx.getBackgroundAudioManager()
        this.backgroundAudioManager.onPause(() => {
            this.handldMusicStateChange(false)
        })
        this.backgroundAudioManager.onPlay(() => {
            this.handldMusicStateChange(true)
            instance.globalData.id = this.data.ids
        })
        this.backgroundAudioManager.onStop(() => {
            this.handldMusicStateChange(false)
        })
    },
    handldMusicStateChange(isPlay) {
        this.setData({
            isPlay
        })
        instance.globalData.isMusicPlay = this.data.isPlay
    },
    async getMusicDetail(ids) {
        let songDetail = await request("/song/detail", {ids})
        let songUrl = await request("/song/url", {id: this.data.ids})

        this.setData({
            songDetail: songDetail.songs[0],
            songUrl
        })
        wx.setNavigationBarTitle({
            title: songDetail.songs[0].name
        })
    },
    handleMusicPlay() {
        this.handleMusicControl(!this.data.isPlay)
    },
    async handleMusicControl(isPlay) {
        if (isPlay) {
            this.backgroundAudioManager.src = this.data.songUrl.data[0].url
            this.backgroundAudioManager.title = this.data.songDetail.name
        } else {
            this.backgroundAudioManager.pause()
        }
    },

    handleSwitch(event) {
        const {type} = event.currentTarget.dataset
        if(type === 'pre'){
        }else {

        }

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