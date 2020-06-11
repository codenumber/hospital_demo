// components/Auth/Auth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '您还未登录'
  },
  pageLifetimes: {
    attached: () => {
      
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    preventMove() {

    },
    handleUserInfo(e) {
      const {userInfo} = e.detail
      userInfo.integral = 0
      this.data.isShow = !this.data.isShow
      wx.setStorageSync('userInfo', userInfo)
      this.triggerEvent('changAuthStatus',{showAuth: this.data.isShow})
    },
    cancleLogin(e) {
      this.data.isShow = !this.data.isShow
      this.triggerEvent('changAuthStatus',{showAuth: this.data.isShow})
    },
    
  }
})
