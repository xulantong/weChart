// pages/search/search.js
import request from "../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultPlaceholder: "",
        hotList: [],
        searchContent: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getDefaultPlaceholder()
        this.getHotList()

    },
    async getDefaultPlaceholder() {
        let defaultPlaceholder = await request("/search/default")
        this.setData({
            defaultPlaceholder: defaultPlaceholder.data.showKeyword
        })
    },
    async getHotList() {
        let hotListData = await request("/search/hot/detail")
        this.setData({
            hotList: hotListData.data.map((item, index) => {
                item.id = index
                return item
            })
        })
    },
    handleInput(event) {
        this.setData({
            searchContent: event.detail.value
        })
        this.getSearchList()
    },
    debounce(fn, delay = 3000) {
        let timer
        return () => {
            if (timer) {
                clearTimeout(timer)
            } else {
                timer = setTimeout(() => {
                    fn()
                }, 1000)
            }
        }
    },
    async getSearchList() {
        this.debounce(async () => {
            let searchListData = await request("/cloudsearch", {keywords: this.data.searchContent, limit: 20})
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