// pages/search/search.js
import request from "../../utils/request";

function debounce(fn, delay = 3000) {
    let timer = null
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);

    }
}

function throttle(fn, wait) {
    let timer = null
    return function () {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            clearTimeout(timer)
            timer = null
        }, wait);
    };
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultPlaceholder: "",
        hotList: [],
        searchContent: "",
        searchList: [],
        historyList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getDefaultPlaceholder()
        this.getHotList()
        let historyList = wx.getStorageSync('historyList')
        if (historyList.length) {
            this.setData({historyList})
        }

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
    handleInput: debounce(function (event) {
        this.setData({
            searchContent: event.detail.value
        })
        this.getSearchList()
    }, 2000),
    async getSearchList() {
        if (!this.data.searchContent) {
            this.setData({
                searchList: []
            })
            return
        }
        let searchListData = await request("/cloudsearch", {keywords: this.data.searchContent.trim(), limit: 20})
        let {historyList} = this.data
        historyList.unshift(this.data.searchContent)
        this.setData({
            searchList: searchListData.result.songs,
            historyList:[...new Set(historyList)]
        })
        wx.setStorageSync('historyList', this.data.historyList)

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