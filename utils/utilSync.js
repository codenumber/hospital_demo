export const showToast = (content,type) => {
  return new Promise((resolve,reject) => {
    wx.showToast({
      title: content,
      icon: type 
    })
  })
}
export const showModal = (params) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      cancelColor: 'grey',
      cancelText: '暂不提问',
      complete: (res) => {},
      confirmColor: '#d64f6f',
      confirmText: '获取积分',
      content: '积分不足',
      fail: (res) => {},
      showCancel: true,
      success: (result) => {
        console.log(result)
        if (result.confirm) {
          wx.switchTab({
            url: params.url,
          })
        } else {
          
        }
      },
      fail: (err) => {
        console.log(err)
      },
      title: '提示',
    })
  })

}



wx.showModal({
  cancelColor: 'cancelColor',
  cancelText: 'cancelText',
  complete: (res) => {},
  confirmColor: 'confirmColor',
  confirmText: 'confirmText',
  content: 'content',
  fail: (res) => {},
  showCancel: true,
  success: (result) => {},
  title: 'title',
})