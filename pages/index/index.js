import {swiperList, videoList, messageList,doctorsList} from '../../utils/comm.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    videoList: [],
    articleList: [],
    doctorsList: [],
    isShowAuth: false
  },
  judgeUserLogin() {
    //小程序打开时会默认首页，如果获取登录信息，如果没有登录显示弹窗
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          console.log(res)
          this.setData({
            isShowAuth: true
          })
        }
      }
    })
  },
  changAuthStatus(e) {
    //授权组件传值将授权窗口隐藏
    this.setData({
      isShowAuth: e.detail.showAuth
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 首页显示3条视频数据
    let videoList = messageList.filter(v => v.typeId === 1)
    videoList = videoList.splice(0, 3)
    //首页承载3条文章数据，进行分割
    let articleList = messageList.filter(v=> v.typeId === 2)
    articleList = articleList.splice(0,3)
    this.setData({
      swiperList,
      videoList,
      articleList,
      doctorsList
    })
    this.judgeUserLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})