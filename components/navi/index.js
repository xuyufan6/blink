// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean, // 是否第一期期刊
    latest: Boolean // 是否最新期刊
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: './images/triangle.dis@left.png',
    leftSrc: './images/triangle@left.png',
    disRightSrc: './images/triangle.dis@right.png',
    rightSrc: './images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      // 不是最新期刊禁用
      if (this.properties.latest) return;
      this.triggerEvent('left', {}, {});
    },
    onRight() {
      // 不是第一期才触发
      if (this.properties.first) return;
      this.triggerEvent('right', {}, {});
    }
  }
});
