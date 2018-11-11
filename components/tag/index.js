// components/tag/index.js
Component({
  // 开启插槽
  options: {
    multipleSlots: true
  },
  // 父级传递class
  externalClasses: ['tag-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent(
        'tapping',
        {
          text: this.properties.text
        },
        {}
      );
    }
  }
});
