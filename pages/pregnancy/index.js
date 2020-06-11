import {pregnancyList, messageList} from '../../utils/comm.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    day: 0,
    pregnancyList: []
  },
  bindDateChange: function(e) {
    
    const date = e.detail.value
    const timeNow = new Date()
    // 设置一个条件。不能早于现在时间之前
    if ( Date.parse(date) < timeNow) {
      return wx.showToast({
        title: '不能设早于当前日期前的哦',
        icon: 'none'
      })
    }
    //计算设置的时间距离当前时间有几天
    const day = Math.ceil((Date.parse(date) - timeNow) / ( 24 * 60 * 60 * 1000))
    this.setData({
      day
    })
    // 当修改预产时间时，孕检周时间也要相应的修改,能显示出来就已经缓存中有孕检周数据存
    this.dealPregnancyList(date)
    
    wx.setStorageSync('date', date)
    wx.setStorageSync('day',day)
  },
  //当点击修改当前项时要处理当前项日期
  bindDateItemChange(e) {
    console.log(e)
    // 获取当前点击的索引，修改当前数组索引下对象的日期值
    const date = e.detail.value
    const index = e.currentTarget.dataset.index
    let newPregnancyList = Object.assign([],this.data.pregnancyList)
    newPregnancyList[index].preDate = date
    this.setData({
      pregnancyList: newPregnancyList
    })
    wx.setStorageSync('pregnancyList', this.data.pregnancyList)
  },
  dealPregnancyList(date) {
    let newpregnancyList = wx.getStorageSync('pregnancyList') || Object.assign([],pregnancyList)
    console.log(newpregnancyList)
    if( date.trim().length !== 0) {
      newpregnancyList.forEach(v => {
        // 孕检周期为40，40 - 相应周得出相差的周，当前时间减相差周的时间戳得出相应时间戳，时间戳转换成日期
        let diff = 40 - parseInt(v.weekNumber)
        console.log(diff)
        const preDate = new Date((Date.parse(date) - diff * 60 * 60 * 24 * 7  * 1000))
        console.log(preDate)
        const year = preDate.getFullYear()
        const month = (preDate.getMonth() + 1 + '').padStart(2,'0')
        const day = (preDate.getDate() + '').padStart(2,'0')
        v.preDate = `${year}-${month}-${day}`
      })
      this.setData({
        pregnancyList: newpregnancyList
      })
      wx.setStorageSync('pregnancyList', newpregnancyList)
    }
    this.setData({
      date
    })
  },
  //点击孕检周项时跳转
  navigatorTo(e) {
    const {num} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../Pre_screening/index?num=' + num,
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const day = wx.getStorageSync('day') || 0
    const date = wx.getStorageSync('date') || ''
    this.dealPregnancyList(date)
    this.setData({
      day
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