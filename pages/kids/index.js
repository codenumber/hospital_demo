// pages/kids/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    birthday: '',
    name: '',
    gender: '',
    kidsList: [],
    left: 0,
    startX: 0,
    isEdit: false,
    index: 0
  },
  animation: '',
  showAddKidsDialog() {
    // 动画对象
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.translateY(150).step()

    this.setData({
      animationData:animation.export()
    })

    setTimeout(function() {
      animation.translateY(1).step()
      this.setData({
        animationData:animation.export()
      })
    }.bind(this), 10)
    this.setData({
      showDialog: true
    })
  },
  setKidsName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  setKidsGender(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  addKidData() {
    // 拷贝值数据对象
    const data = Object.assign({},this.data)
    // 表单判断条件
    if (data.name.trim().length === 0) return wx.showToast({title: '孩子名字不能为空', icon: "none"})
    if (data.birthday.length === 0 ) return wx.showToast({title: '日期不能为空', icon: "none"})
    // 年纪以天来计算
    let now = Date.now()
    let day = Math.floor((Date.parse(data.birthday) - now)/ (24 * 60 * 60 * 1000 ))
    // 将数据push到数组中
  
    data.kidsList.push(
      { name: data.name,
        gender: parseInt(data.gender),
        birthday: data.birthday,
        day,
        left: 0,
      }
    )
    this.setData({
      showDialog: false,
      kidsList: data.kidsList,
      name: '',
      gender: 2,
      birthday: '',
    })
    wx.setStorageSync('kidsList', data.kidsList)
  },
  editKidInfo(e) {
        
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.translateY(150).step()

    this.setData({
      animationData:animation.export()
    })

    setTimeout(function() {
      animation.translateY(1).step()
      this.setData({
        animationData:animation.export()
      })
    }.bind(this), 10)
    // 获取点击事件传递的index值，将其设置到data对象中，方便修改数据时操作。
    const {index} = e.currentTarget.dataset
    const kidsList = Object.assign([], this.data.kidsList)
    
    this.setData({
      showDialog: true,
      name: kidsList[index].name,
      gender: String(kidsList[index].gender),
      birthday: kidsList[index].birthday,
      left: 0,
      isEdit: true,
      index
     })
  },
  touchStart(e) {
    const startX = e.touches[0]['clientX'] 
    this.setData({
      startX
    })
  },
  moveDistance(e) {
     // 拷贝data中的kidsList数据，免得冲突
    let kidsList = Object.assign([],this.data.kidsList)
    const {index} = e.currentTarget.dataset
    if (kidsList[index].left === 0) {
      kidsList.forEach( v => v.left = 0)
    }
    // 在手势滑动时将data中kidsLIst中的每一项left置为0
    const clientX = e.touches[0]['clientX']
    const clientY = e.touches[0]['clientY']
    const startX = this.data.startX
    const dist = clientX - startX 
    // 左滑时
    if (dist < 0) {
      // 如果左滑移动距离是大于删除图标的宽度，就固定只是滑动删除图标的宽度
      if (dist < -150 ) {
        kidsList[index].left = -150
        this.setData({
          kidsList
        })
      }
      if (dist > -150) {
        // 左滑移动距离小于删除图标宽度，跟随大小移动
        kidsList[index].left = dist
        this.setData({
          kidsList
        })
      }
    } else {
      // 右滑
      if (kidsList[index].left < 0) {
          kidsList[index].left += 10
          this.setData({
            kidsList
          })
        }
      }
      wx.setStorageSync('kidsList', kidsList)
  },
  submitEditKidData(e) {
    // 拷贝数据避免冲突
    const data = Object.assign({},this.data)
    let kidsList = wx.getStorageSync('kidsList') || []
    // 将修改的信息进行中转处理
    const name = data.name
    const birthday = data.birthday
    const gender = data.gender
    kidsList[data.index].name = name
    kidsList[data.index].gender = gender
    kidsList[data.index].birthday = birthday
    wx.setStorageSync('kidsList', kidsList)
    
    this.setData({
      isEdit: false,
      name: '',
      gender: 0,
      birthday: '',
      showDialog: false
    }) 
    this.onShow()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindDateChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  closeDialog() {
    // 关闭弹出框时清空数据
    this.setData({
      showDialog: false,
      name: '',
      gender: '',
      birthday: '',
      isEdit: false
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
    // 将孩子列表存储在本地缓存中，读取是否有。
    const kidsList = wx.getStorageSync('kidsList') || []
    this.setData({
      kidsList,
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