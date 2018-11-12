import Http from '../utils/http';

class ClassicModel extends Http {
  getLatest() {
    return this.request({
      url: 'classic/latest'
    });
  }

  getClassic(index, nextOrPrev) {
    return this.request({
      url: `classic/${index}/${nextOrPrev}`
    });
  }

  getMyFavor() {
    return this.request({
      url: `classic/favor`
    });
  }
}

export default new ClassicModel();
