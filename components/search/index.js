// components/search/index.js
import keywordModel from '../../models/keyword';
import booksModel from '../../models/books';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer() {
        this.loadMore();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    q: '',
    historyWords: [],
    hotWords: [],
    total: null,
    books: [],
    noneResult: false,
    loading: false,
    loadingCenter: false
  },

  attached() {
    this._getHistoryWords();
    keywordModel.getHot().then(data => {
      this.setData({
        hotWords: data.hot
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      // 判断是否为空，是否加锁
      if (!this.data.q || this._isLocked()) return;
      // 判断是否没有更多数据了
      if (!this._hasMore()) return;

      // 加锁
      this._locked();

      booksModel
        .search(this._getCurrentStart(), this.data.q)
        .then(res => {
          this._setMoreData(res.books);
          this._unLocked();
        })
        .catch(err => {
          // 解锁
          this._unLocked();
        });
    },

    onCancel(event) {
      this._initialize();
      this.triggerEvent('cancel', {}, {});
    },

    onDelete() {
      this._initialize();
      this._closeResult();
      this._getHistoryWords();
    },

    onConfirm(event) {
      this._initialize();
      this._showResult();
      this._showLoadingCenter();

      const q = event.detail.value || event.detail.text;
      this.setData({ q });

      booksModel.search(0, q).then(data => {
        this._hideLoadingCenter();
        this._setTotal(data.total);
        this._setMoreData(data.books);
        keywordModel.addToHistory(q);
      });
    },

    _getCurrentStart() {
      return this.data.books.length;
    },

    _initialize() {
      this.setData({
        books: [],
        noneResult: false,
        loading: false,
        total: null
      });
    },

    _isLocked() {
      return this.data.loading;
    },

    _locked() {
      this.setData({
        loading: true
      });
    },

    _unLocked() {
      this.setData({
        loading: false
      });
    },

    _setMoreData(dataArr) {
      const books = this.data.books.concat(dataArr);
      this.setData({
        books
      });
    },

    _setTotal(total) {
      this.data.total = total;
      if (total == 0) {
        this.setData({
          noneResult: true
        });
      }
    },

    _hasMore() {
      return !(this._getCurrentStart() >= this.data.total);
    },

    _getHistoryWords() {
      this.setData({
        historyWords: keywordModel.getHistory()
      });
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      });
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      });
    },

    _showResult() {
      this.setData({
        search: true
      });
    },
    _closeResult() {
      this.setData({
        search: false,
        q: ''
      });
    }
  }
});
