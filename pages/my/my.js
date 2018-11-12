// pages/my/my.js
import bookModel from '../../models/books';
import classicModel from '../../models/classic';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classic: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              });
            }
          });
        }
      }
    });
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      });
    });
  },

  getMyFavor() {
    classicModel.getMyFavor().then(res => {
      console.log(res);
      this.setData({
        classic: res
      });
    });
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    // console.log(userInfo);
    if (!userInfo) return;
    this.setData({
      userInfo,
      authorized: true
    });
  },
  onJumpToDetail(event) {
    const cid = event.detail.cid;
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?id=${cid}`
    });
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
  onShareAppMessage: function() {}
});
