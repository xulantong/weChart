import request from "../../utils/request";
import PubSub from "pubsub-js"
import dayjs from "dayjs";

const instance = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
        ids: "",
        songDetail: {},
        songUrl: "",
        currentTime: "00:00",
        durationTime: "00:00",
        currentWidth: 0
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
        PubSub.subscribe("switchTypeCallback", async (msg, id) => {
            this.setData({ids: id})
            await this.getMusicDetail(id)
            await this.handleMusicControl(true)
        })

        this.backgroundAudioManager.onTimeUpdate(() => {
            let {currentTime, duration} = this.backgroundAudioManager
            this.setData({
                currentTime: dayjs(currentTime * 1000).format("mm:ss"),
                currentWidth: (currentTime && duration) ? ((currentTime / duration)) : 0
            })
        })
        this.backgroundAudioManager.onEnded(() => {
            PubSub.publish("switchType", {type: "next", id: this.data.ids})
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
        let durationTime = dayjs(songDetail.songs[0].dt).format("mm:ss")
        this.setData({
            songDetail: songDetail.songs[0],
            durationTime,
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
        PubSub.publish("switchType", {type, id: this.data.ids})
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
        PubSub.unsubscribe("switchTypeCallback")
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