// pages/education/index.js
import {messageList} from '../../utils/comm.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [
      {
        cateId: 1,
        navText: "孕前",
        isActive: true
      },
      {
        cateId: 2,
        navText: "孕期",
        isActive: false
      },
      {
        cateId: 3,
        navText: "产后康复",
        isActive: false
      },
      {
        cateId: 4,
        navText: "早教",
        isActive: false
      },
      {
        cateId: 5,
        navText: "婴幼儿护理",
        isActive: false
      },
    ],
    typeList: [
      {
        id: 0,
        text: "全部"
      },
      {
        id: 1,
        text: "视频"
      },
      {
        id: 2,
        text: "文章"
      }
    ],
    isActive: true,
    animationData: [],
    showDrop: false,
    messageList: []
  },
  touchId: 0,
  navCateId: 1, //页面加载时直接默认第一菜单项
  showDropMenu() {
    //点击变动是否显示下拉菜单
    const showDrop = !this.data.showDrop
    this.setData({
      showDrop: showDrop
    })
  },
  setShowMessage(cateid = 1,touchId = 0) {
    //拷贝数组，避免影响原数组
    let newMessageList = Object.assign([],messageList)
    let showMessage = []
    if (touchId === 0) {
      showMessage = newMessageList.filter(v => {
        return v.cateId === parseInt(cateid) 
      })
    } else {
      console.log(typeof cateid,typeof touchId)
      showMessage = newMessageList.filter(v => {
        return v.cateId === cateid && v.typeId === touchId
      })
    }
    this.setData({
      messageList: showMessage
    })
  },
  showActive(e) {
    const {cateid} = e.currentTarget.dataset
    this.navCateId = cateid
    //先将数组中的所有值变成false,寻找到点击的分类，改变分类的isActive
    let newNavList = Object.assign([],this.data.navList)
    newNavList.forEach(v => {
      v.isActive = false
    })
    const index = newNavList.findIndex(v => v.cateId === parseInt(cateid))
    newNavList[index].isActive = true
    this.setShowMessage(cateid,this.touchId)
    this.setData({
      navList: newNavList
    })
  },
  chooseShowMessageType(e) {
    const {index} = e.currentTarget.dataset
    this.touchId = parseInt(index)
    this.setShowMessage(this.navCateId,parseInt(index))
    this.setData({
      showDrop: false
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
    this.setShowMessage()
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