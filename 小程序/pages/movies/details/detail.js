// pages/movies/details/detail.js
var app=getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId=options.movieId;
    var baseUrl=app.globalData.baseUrl;
    var url=baseUrl+"/v2/movie/subject/"+movieId;
    console.log(url);
    var _this=this;
    var sureData=[];
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
       var obj={
         title:res.data.title,
         year:res.data.year,
         countries: res.data.countries[0],
         collect_count: res.data.collect_count,
         comments_count: res.data.comments_count,
         original_title: res.data.original_title,
         stars:res.data.rating.stars,
         directors: res.data.directors[0].name,
         casts: util.formatCasts(res.data.casts),
         summary:res.data.summary,
         images:res.data.images.small,
         genres:res.data.genres

       }
        sureData.push(obj);
        _this.setData({showData:sureData});
        console.log(_this.data.showData);
      }  
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