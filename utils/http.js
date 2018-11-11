import { config } from '../config';

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
};

export default class Http {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      wx.request({
        data,
        method,
        url: config.baseUrl + url,
        header: {
          'content-type': 'application/json',
          appkey: config.appkey
        },
        dataType: 'json',
        success: res => {
          let code = res.statusCode.toString();
          if (code.startsWith('2')) {
            resolve(res.data);
          } else {
            reject();
            const errorCode = res.data.error_code;
            this._showError(errorCode);
          }
        },
        fail: err => {
          reject(err);
        },
        complete: () => {}
      });
    });
  }

  _showError(errCode) {
    if (!errCode) {
      errCode = 1;
    }
    const tip = tips[errCode];
    wx.showToast({
      title: tip || tips[1],
      icon: 'none',
      duration: 2000
    });
  }
}
