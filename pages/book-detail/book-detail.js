// pages/book-detail/book-detail.js
import bookModel from '../../models/books';
import likeModel from '../../models/like';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const id = options.id;
    const detail = bookModel.getDetail(id);
    const comments = bookModel.getComments(id);
    const likeStatus = bookModel.getLikeStatus(id);

    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      });
    });
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel, this.data.book.id, 400);
  },

  onFakePost(event) {
    this.setData({
      posting: true
    });
  },

  onCancel(event) {
    this.setData({
      posting: false
    });
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value;

    if (!comment) {
      return;
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      });
      return;
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      });

      this.data.comments.unshift({
        content: comment,
        nums: 1
      });

      this.setData({
        comments: this.data.comments,
        posting: false
      });
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
