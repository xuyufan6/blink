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
}

export default new ClassicModel();
