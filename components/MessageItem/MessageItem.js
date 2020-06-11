import { messageList } from "../../utils/comm"

// components/MessageItem/MessageItem.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
      addGlobalClass: true
  
  },
  properties: { 
    messageList: {
      type: Array,
      value: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigatorToPage(e) {
      //判断点击的视频数据，还是推文数据。因为两者的页面是不一样，故区分开
      let messageList = Object.assign([],this.data.messageList)
      const {dataset: {typeid}, dataset: {index}} = e.currentTarget
      const activeMessage = messageList.filter(v => v.id === parseInt(index))[0]
      if (parseInt(typeid) === 2) {
        //如果是推文文章的话直接传个url就可以了
        return wx.navigateTo({
          url: '../message/index?url=' + activeMessage.url,
        })
      }
      //如果是视频的，存缓存中直接用于下一个页面的读取
      wx.setStorageSync('activeMessage', activeMessage)
      wx.navigateTo({
        url: '../video/index?id=' + activeMessage.id,
      })
    }
  }
})
