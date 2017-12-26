// pages/movies/mores/more.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    moreTitle:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type=options.type;
    this.setData({moreTitle:type});
    var baseUrl = app.globalData.baseUrl;
    if(type=="正在热映"){
      var url= baseUrl + "/v2/movie/in_theaters?count=12&start=0";
    }else if(type=="即将上映"){
      var url = baseUrl + "/v2/movie/coming_soon?count=12&start=0"
    }else{
      var url= baseUrl + "/v2/movie/top250?count=12&start=0";
    }
    this.getData(url);
  },
  getData: function (url) {
    // console.log(url)
    var _this = this;
    //调取ajax获取数据
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        _this.formatData(res.data.subjects)
      }
    })
  },
  formatData: function (data) {
    var sureData = [];
    for (var i = 0; i < data.length; i++) {
      var title = data[i].title;
      if (title.length >= 6) {
        title = title.substr(0, 6) + "..."
      }
      //星星评分格式化之后的数据
      var formatStars = util.formatStars(data[i].rating.stars);
      var obj = {
        title: title,
        stars: data[i].rating.stars,
        img: data[i].images.small,
        id: data[i].id,
        formatStars: formatStars
      }
      sureData.push(obj);
    }
    // var obj = {};
    // obj[type] = sureData;
    // this.setData(obj);
    console.log(sureData);
    this.setData({"data":sureData});
    
  },
   
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.moreTitle
    })
  },
  showDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '/pages/movies/details/detail?movieId=' + movieId,
    })
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