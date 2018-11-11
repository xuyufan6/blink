// components/classic/music/index.js
import { classicBehavior } from '../classic.beh';

// 背景音频
const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: './images/player@pause.png',
    playSrc: './images/player@play.png'
  },

  attached() {
    this._recoverStatus();
    this._monitorSwitch();
  },

  detached() {
    // mMgr.stop();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      // 图片切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        });
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        });
        mMgr.pause();
      }
    },

    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        });
        return;
      }

      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        });
      }
    },

    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus();
      });
      mMgr.onPause(() => {
        this._recoverStatus();
      });
      mMgr.onStop(() => {
        this._recoverStatus();
      });
      mMgr.onEnded(() => {
        this._recoverStatus();
      });
    }
  }
});
