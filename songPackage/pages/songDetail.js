// songPackage/pages/songDetail.js
import request from "../../util/request";

const appInstance = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
        musicId: '',
        song: {},
        musicLink: ''
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let musicId = options.musicId;
        //加载音乐
        this.getMusicDetail(musicId)


        //音乐管理对象
        this.backgroundAudioManager = wx.getBackgroundAudioManager();


        if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
            // todo 播放继续
            this.controlPlay(true);
            this.changePlayState(true)
        }

        this.backgroundAudioManager.onPlay(() => {
            this.changePlayState(true)
        });
        this.backgroundAudioManager.onPause(() => {
            this.changePlayState(false)
        })
        this.backgroundAudioManager.onStop(() => {
            this.changePlayState(false)
        })
    },

    handlePlay() {
        this.setData({
            isPlay: !this.data.isPlay
        })
        this.controlPlay(this.data.isPlay);
    },

    changePlayState(isPlay) {
        this.setData({
            isPlay: isPlay
        });
        appInstance.globalData.isMusicPlay = isPlay;
    },

    async getMusicDetail(musicId) {
        let musicData = await request("/song/detail", {ids: musicId})
        this.setData({
            song: musicData.songs[0],
            musicId
        })

        // 动态修改窗口标题
        wx.setNavigationBarTitle({
            title: this.data.song.name
        })
    },

    async controlPlay(isPlay) {
        if (isPlay) {
            let musicLink = this.data.musicLink;
            if (!musicLink) {
                let musicUrl = await request("/song/url", {id: this.data.musicId})
                musicLink = musicUrl.data[0].url;
                this.setData({
                    musicLink
                })
            }
            appInstance.globalData.isMusicPlay = isPlay;
            appInstance.globalData.musicId = this.data.musicId;
            this.backgroundAudioManager.src = this.data.musicLink;
            this.backgroundAudioManager.title = this.data.song.name;
        } else {
            this.backgroundAudioManager.pause();
        }

    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})