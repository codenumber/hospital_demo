// pages/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },
  // handleLoad(e) {
  //   console.log(e)
  //   let userInfo = wx.getStorageSync('userInfo') || {}
  //   if (userInfo.nickName) {
  //     //当用户登录时开始计时加积分
  //     let timeId = setInterval(()=> {
  //       wx.showToast({
  //         title: '获取积分5积分',
  //       })
  //       userInfo.integral += 5
  //       wx.setStorageSync('userInfo', userInfo) 
  //       clearInterval(timeId)
  //     },60*1000)
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  timeId: '',
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo') || {}
    if (userInfo.nickName) {
      this.timeId = setInterval(() => {
        // 用户点击文章阅读30秒后可以添加积分
          let integral = wx.getStorageSync('integral') || []
          integral.push({
            qid: 2,
            type: 'read',
            explain: '阅读文章',
            integral_num: 5, // 阅读文章得到5 积分
            create_time: Date.now()
          })
          wx.showToast({
            title: '增加5积分',
            icon: 'none'
          })
          userInfo.integral += 5
          clearInterval(this.timeId)
          wx.setStorageSync('userInfo', userInfo)
          wx.setStorageSync('integral', integral)
      },1000 * 30)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.timeId)
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