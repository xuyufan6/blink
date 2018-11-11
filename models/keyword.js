import Http from '../utils/http';

class KeywordModel extends Http {
  key = 'q';
  maxLength = 10;

  getHistory() {
    const words = wx.getStorageSync(this.key);
    return words || [];
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    });
  }

  addToHistory(keyword) {
    // 从缓存里找储存数据, 如果存在相同的值，立即返回。
    let words = this.getHistory();
    const has = words.includes(keyword);
    if (has) return;

    // 如果当前数据的长度超出或等于最大长度，则删除最后一个
    const len = words.length;
    if (len >= this.maxLength) {
      words.pop();
    }
    // 往第一个位置插入数据，并保存到缓存中
    words.unshift(keyword);
    wx.setStorageSync(this.key, words);
  }
}

export default new KeywordModel();
