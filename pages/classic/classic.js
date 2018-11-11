// pages/classic/classic.js
import classicModel from '../../models/classic';
import likeModel from '../../models/like';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    likeStatus: false, // like 组件的初始状态
    likeCount: 0, // like组件的初始值
    classic: null,
    latest: true, // 是否最新期刊
    first: false // 是否第一期期刊
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLatest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  getLatest() {
    classicModel.getLatest().then(res => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
      // 把最新一期期刊加入缓存中
      this._setLatestIndex(res.index);
      let key = this._getKey(res.index);
      wx.setStorageSync(key, res);
    });
  },

  onLike(event) {
    // console.log(event);
    const { behavior } = event.detail;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },

  onNext(event) {
    this._updateClassic('next');
  },

  onPrevious() {
    this._updateClassic('previous');
  },

  _updateClassic(nextOrPrev) {
    let index = this.data.classic.index;
    // 从缓存中读取数据
    let key =
      nextOrPrev === 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    // 如果缓存中存在，则采用缓存中的数据
    if (classic) {
      this._updateClassicAndTab(classic);
      return;
    }

    // 否则从新请求数据, 并存进缓存中
    classicModel.getClassic(index, nextOrPrev).then(data => {
      this._updateClassicAndTab(data);
      wx.setStorageSync(this._getKey(data.index), data);
    });
  },

  _updateClassicAndTab(data) {
    this._getClassicLikeStatus(data.id, data.type);
    this.setData({
      classic: data,
      latest: this._isLatest(data.index),
      first: this._isFisrt(data.index)
    });
  },

  _getClassicLikeStatus(id, type) {
    likeModel.getClassicLikeStatus(id, type).then(data => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      });
    });
  },

  _isFisrt(index) {
    return Boolean(index === 1);
  },

  _isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return Boolean(index === latestIndex);
  },

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  },

  _getLatestIndex() {
    return wx.getStorageSync('latest');
  },

  _getKey(index) {
    return `classic-${index}`;
  }
});
