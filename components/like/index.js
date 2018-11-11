// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 0
    },
    like: {
      type: Boolean,
      value: false
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      // 当 readOnly 为true时，禁止点击
      if (this.properties.readOnly) {
        return;
      }

      // 根据like 状态来对count 自增还是自减
      let { like, count } = this.properties;
      count = like ? count - 1 : count + 1;
      this.setData({
        count,
        like: !like
      });

      // 自定义事件， 并把组件当前状态通过自定义事件派发出去
      let behavior = this.properties.like ? 'like' : 'cancel';
      // console.log(behavior)
      this.triggerEvent(
        'like',
        {
          behavior
        },
        {}
      );
    }
  }
});
