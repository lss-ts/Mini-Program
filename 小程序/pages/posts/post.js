// pages/posts/post.js
// 引入文件 只能用相对地址
var postList=require("../../data/post-data.js");
console.log(postList.postList);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:["/images/iqiyi.png","/images/vr.png","/images/wx.png"],
    postList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.postList);
      // ajax接收
    this.setData({postList:postList.postList})
  },
  showDetail:function(event){
    console.log(event);
    var postId=event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '/pages/posts/post-details/post-detail?postId='+postId,
    })
  },
  navigatorPage:function(event){
  // console.log(event);
    var postId=event.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: '/pages/posts/post-details/post-detail?postId=' + postId,
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