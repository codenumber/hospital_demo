import {doctorsList} from '../../utils/comm.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorsList: [],
    inputValue: ''
  },
  getInputValue(e) {
    //获取输入的值
    const {value} = e.detail
    let resultList = []
    doctorsList.forEach((v, i) => {
      //用search查找。当字符串为空时会匹配所有值
      if(v.hosipital.search(value) !== -1 || v.name.search(value) != -1 ){
        resultList.push(v)
      }
    })
    console.log(resultList)
    this.setData({
      inputValue: value,
      doctorsList: resultList
    })

  },
  clearInputValue() {
    this.setData({
      inputValue: '',
      doctorsList: doctorsList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      doctorsList: doctorsList
    })
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