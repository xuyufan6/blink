import Http from '../utils/http';

class BooksModel extends Http {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    });
  }

  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q,
        start
      }
    });
  }
}

export default new BooksModel();
