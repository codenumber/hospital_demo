// pages/ask/index.js
import {doctorsList} from '../../utils/comm.js'
import {showModal} from '../../utils/utilSync.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctor: {},
    userInfo: {},
    messageVaule: '',
    imgTempList: []
  },
  uploadImg() {
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        // 定数组存储临时图片数据
        let imgTempList = Object.assign([],this.data.imgTempList)
        //加一个判断，确保几次加的图片不超过5
        const tempFilePaths = res.tempFilePaths
        if (imgTempList.length < 5 && imgTempList.length + tempFilePaths.length <= 5) {
          imgTempList.push(...tempFilePaths)
          this.setData({
            imgTempList
          })
        } else {
          wx.showToast({
            title: '仅限5张图片',
            icon: 'none'
          })
        }
        
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  handleImgClose(e) {
    const {index} = e.detail
    let newImgList = Object.assign([],this.data.imgTempList)
    newImgList.splice(index, 1)
    this.setData({
      imgTempList: newImgList
    })
  },
  submitMessage() {
    const value = this.data.messageVaule
    const tempImgList = Object.assign([],this.data.imgTempList) 
    // if (this.data.userInfo.integral < this.data.doctor.integral || value.trim().length === 0) {
    //   return showModal({url: '../education/index'})
    // }
    // tempImgList.forEach(v => {
    //   //模拟学习上传过程，只能上传一个图片，遍历上传 用图床进行测试 
    //   console.log(v)
    //   wx.uploadFile({
    //     filePath: v,
    //     name: 'image',
    //     url: 'https://img.coolcr.cn/api/upload',
    //     success: (result) => {
    //       console.log(result)
    //       const {data:{code},data:{url}} = result
    //       if (code !== 200) return 
    //       wx.showToast({
    //         title: '上传成功',
    //         icon: 'none'
    //       })
      //   },
      //   fail: (err) => {
      //     console.log(err)
      //   }
      // })
    // })
    //建立一个提问数据的数组，存在本地缓存中,当医生登录时能查看到该提问信息
    let question = wx.getStorageSync('question') || []
    question.push({
      qid: question.length + 1,
      doctor_id: this.data.doctor.id,//医生id
      userInfo: this.data.userInfo,
      question_content: {
        message: value,
        pics: tempImgList
      },
      create_time: new Date().getTime()
    })
    //缓存中存储，并且在缓存中将用户的分值进行相应的减少，后续需要对用户行为积分信息的展示建一个积分表
    this.data.userInfo.integral -= this.data.doctor.integral
    console.log(this.data.userInfo)
    wx.setStorageSync('userInfo', this.data.userInfo)
    wx.setStorageSync('question', question)
    //建立一个积分行为表
    let integral = wx.getStorageSync('integral') || []
    integral.push({
      qid: 4,
      type: 'pay',
      explain: '提问',
      integral_num: this.data.doctor.integral,
      create_time: Date.now()
    })
    wx.setStorageSync('integral', integral)
    //跳转回去
    wx.showToast({
      title: '提问成功',
      success: (result) => {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  setMessageValue(e) {
    //获取输入框中输入的值，刷新设置到data中
    console.log(e)
    const {value} = e.detail
    this.setData({
      messageVaule: value
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
    // 获取用户数据
    const userInfo = wx.getStorageSync('userInfo')
    const pages = getCurrentPages()
    console.log(pages)
    const {doctorId} = pages[pages.length - 1].options
    console.log(typeof doctorId)
    // const currPage = pages[pages.length - 1]
    //过滤得到当前医生的数据
    const doctor = doctorsList.filter(v => v.id === parseInt(doctorId))
    this.setData({
      doctor: doctor[0],
      userInfo
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