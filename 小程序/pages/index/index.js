//index.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"张三",
    age:18
  },
nextpage:function(){
  //跳转详细页
  // wx.navigateTo({
  //   url: '/pages/posts/post',
  // })
  wx.switchTab({
    url: '/pages/posts/post',
  })
  // wx.redirectTo({
  //   url: '/pages/posts/post',
  // })
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("onhide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("onunload");
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