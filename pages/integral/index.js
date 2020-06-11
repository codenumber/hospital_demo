// pages/integral/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getDate(timestamp) {
    const year = new Date(timestamp).getFullYear()
    const month = (new Date(timestamp).getMonth() + 1 + '').padStart(2, '0')
    const day = (new Date(timestamp).getDate() + '').padStart(2, '0')
    return `${year}年${month}月${day}日`
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let dateList = []
    let integral = wx.getStorageSync('integral') || []
    integral = integral.forEach(v => {
      v.create_time = this.getDate(v.create_time)
      const length = dateList.filter(v1 => v1.create_time === v.create_time).length
      if (length > 0) {
        let index = dateList.findIndex(v2 => v2.create_time === v.create_time)
        if (v.qid === 1) dateList[index].signIntegral = v.integral_num
        if (v.qid === 2) dateList[index].messageIntegral += v.integral_num
        if (v.qid === 3) dateList[index].videoIntegral += v.integral_num
        if (v.qid === 4) dateList[index].askIntegral += v.integral_num
        return 
      }
      dateList.push({
        create_time: v.create_time,
        signIntegral: v.qid === 1? v.integral_num : 0,
        messageIntegral: v.qid === 2? v.integral_num : 0,
        videoIntegral: v.qid === 3? v.integral_num : 0,
        askIntegral: v.qid === 4? v.integral_num : 0
       })
    })
    this.setData({
      dateList
    })
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