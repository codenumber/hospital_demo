// components/DoctorInter/DoctorInter.js

import {showModal} from '../../utils/utilSync.js'
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  
  properties: {
    doctor: {
      type:  Object,
      value: {}
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
    toAsk(e) {
      //获取用户信息，当用户没登录过点击时，跳出授权窗口
      const userInfo = wx.getStorageSync('userInfo') || {}
      if (!userInfo.nickName) {
        //内存中没有用户信息,传递数据给index页面，显示授权窗口
        return this.triggerEvent('changAuthStatus', {showAuth: true})
      } 
      //判断用户的积分是否足以支付当前点击的医生的积分
      const {doctorid} = e.currentTarget.dataset
      wx.navigateTo({
        url: '../../pages/ask/index?doctorId=' + doctorid,
      })
     
    }
  }
})
