// pages/video/index.js
import {messageList, videoList} from '../../utils/comm.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {}
  },
  duration: 0,
  timeId: '',
  addInterval() {
    let userInfo = wx.getStorageSync('userInfo') || {}
    if (userInfo.nickName) {
      this.timeId = setInterval(() => {
        this.duration ++
        console.log(this.duration)
        // 用户点击播放30秒后可以添加积分
        if (this.duration > 30) {
          let integral = wx.getStorageSync('integral') || []
          integral.push({
            qid: 3,
            type: 'share',
            explain: '分享视频',
            integral_num: 5, // 分享视频得到5 积分
            create_time: Date.now()
          })
          wx.showToast({
            title: '增加5积分',
            icon: 'none'
          })
          clearInterval(this.timeId)
          userInfo.integral += 5
          wx.setStorageSync('userInfo', userInfo)
          wx.setStorageSync('integral', integral)
        }
      },1000)
    }
  },
  pauseInterval() {
    clearInterval(this.timeId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取通过url传递的id。通过正则获取vid
    const id = parseInt(options.id)
    const video = messageList.filter(v => v.id === id)[0]
    let patt = /\?vid=([\d\w]+)/
    const uid = patt.exec(video.url)[1]
    console.log( patt.exec(video.url))
    // 因腾讯视频没法直接连接使用，需要特定的方式用钥匙去读取，先发送请求获得json数据，对json数据进行匹配处理
    wx.request({
      url: `http://vv.video.qq.com/getinfo?vids=${uid}&platform=101001&charge=0&otype=json`,
      success: (result) => {
        const {statusCode} = result
        if (statusCode !== 200) return 
        let {data} = result 
        let newData = JSON.parse(data.replace("QZOutputJson=", '').slice(0,-1))
        const { vl: {vi:[{fn}]},vl: {vi:[{fvkey}]}, vl:{vi: [{ul:{ui:[,{url}]}}]}} = newData
        const src = url.replace('http','https') + fn + '?vkey=' + fvkey 
        video.src = src
        this.setData({
          video
        })
      }
    })
    
  },
  // 编写一个获取推荐视频的递归函数，获取推荐视频数组
  getVideoList(array,videoMessgeList) {
    // 获取一个随机数索引下标
    let index = Math.floor(Math.random() * videoMessgeList.length ) 
    array.push(videoMessgeList[index])
    videoMessgeList.splice(index,1)
    if (array.length < 3) return this.getVideoList(array,videoMessgeList)
    return array
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
    // 获取推荐视频数组，过滤出视频数组，在随机获取推荐视频数组
    const videoMessgeList = messageList.filter(v => v.typeId === 1)
    let videoList = []
    // 调用写好的递归方法获取推荐数组
    videoList = this.getVideoList(videoList,videoMessgeList)
    this.setData({
      videoList
    })
   },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.timeId)
    this.timeId = 0
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
  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    // 不能实现。微信已废除分享成功失败的回调，据说是防止诱导分享
    
    // return {
    //   success: (res) => {
    //     console.log(res)
    //     let integral = wx.getStorageSync('integral') || []
    //     integral.push({
    //       type: 'share',
    //       explain: '分享视频',
    //       integral_num: 5, // 分享视频得到5 积分
    //       create_time: Date.now()
    //     })
    //     wx.setStorageSync('integral', integral)
    //   },
    //   fail: (err) => {
    //     console.log(err)
    //   }
    // }
  }
})