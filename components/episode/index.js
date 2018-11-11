// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer(newVal, oldVal, changePath) {
        // 观察者，当index发生变化时，触发
        let val = newVal < 10 ? '0' + newVal : newVal;

        this.setData({
          _index: val
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    month: '',
    year: 0,
    _index: ''
  },
  /*
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached() {
    this._initMonthAndYear();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _initMonthAndYear() {
      let monthArr = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ];
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      this.setData({
        year,
        month: monthArr[month]
      });
    }
  }
});
