// songPackage/pages/recommendSong.js
import request from "../../util/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        index: 0,
        recommendList: []
    },

    //加载播放列表
    async getRecommendList() {
        let recommendListData = await request('/recommend/songs')
        this.setData({
            recommendList: recommendListData.recommend
        });
    },

    // 跳转到音乐详情
    toSongDetail(event) {
        let {index, song} = event.currentTarget.dataset;
        wx.navigateTo({
            url: '/songPackage/pages/songDetail?musicId=' + song.id
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRecommendList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 初始化时间
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })
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