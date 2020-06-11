// pages/user/index.js
import {doctorList, doctorsList} from '../../utils/comm.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    questionList: {},
    kidsList: []
  },
  handleuserinfo(e) {
    console.log(e)
    let userInfo = e.detail.userInfo
    userInfo.integral = 0
    wx.setStorageSync('userInfo', userInfo)
    this.onShow()
  },
  clickToSign() {
    console.log('hehheh')
    let integral = wx.getStorageSync('integral') || []
    let signList = integral.filter(v => v.type === 'sign')
    console.log(signList)
    let userInfo = wx.getStorageSync('userInfo')
    if (signList.length !== 0) {
      signList.forEach(v => {
        let nowTime = Date.now()
        let dayStartTime = new Date(new Date(Date.now()).toDateString()).getTime()
        let dayEndTime = dayStartTime + 60 * 60 * 24 * 1000 - 1
        if (v.create_time > dayStartTime && v.create_time < dayEndTime) {
           return wx.showToast({
            title: '今天已签到,只能明天了哦',
            icon: 'none'
          })
        } 
        
      })
      return
    }
    integral.push({
      qid: signList.length + 1,
      explain: "签到",
      type: 'sign',
      integral_num: 10,
      create_time: Date.now()
    })
    wx.showToast({
      title: '签到成功，积分加10',
      icon: 'none'
    })
    userInfo.integral += 10
    wx.setStorageSync('userInfo', userInfo)
    wx.setStorageSync('integral', integral)
    this.onShow() 
    
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
    const userInfo = wx.getStorageSync('userInfo') || {}
    const question = wx.getStorageSync('question') || []
    const kidsList = wx.getStorageSync('kidsList') || []
    
    let questionList = []
    question.forEach(v1 => {
      let doctor = doctorsList.filter(v => v.id === v1.doctor_id)[0]
      questionList.push({
        doctor,
        question_content: v1.question_content,
        create_time: new Date(v1.create_time).toLocaleDateString()
      })
    })
    console.log(questionList)

    this.setData({
      userInfo,
      questionList,
      kidsList
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