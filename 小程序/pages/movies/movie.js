// pages/movies/movie.js
var util = require("../../utils/util.js");
// var arr = util.formatStars(35);
// console.log(arr)
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    in_theaters: {},
    coming_soon: {},
    top250: {},
    is_search:false,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.baseUrl);
    var baseUrl = app.globalData.baseUrl;
    //正在热映的借口
    var in_theaters_Url = baseUrl + "/v2/movie/in_theaters?count=3&start=0";
    //即将上映的借口
    var coming_soon_Url = baseUrl + "/v2/movie/coming_soon?count=3&start=0";
    //TOP250的借口
    var top250_Url = baseUrl + "/v2/movie/top250?count=3&start=0";
    this.getData(in_theaters_Url, "in_theaters", "正在热映");
    this.getData(coming_soon_Url, "coming_soon", "即将上映");
    this.getData(top250_Url, "top250", "top250");


  },
  getData: function (url, type, listTitle) {
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
        _this.formatData(res.data.subjects, type, listTitle)
      }
    })
  },
  formatData: function (data, type, listTitle) {
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
    var totalData = {
      listTitle: listTitle,
      movies: sureData
    }
    if (type == "in_theaters") {
      this.setData({
        "in_theaters": totalData
      })
    } else if (type == "coming_soon") {
      this.setData({
        "coming_soon": totalData
      })
    } else {
      this.setData({ "top250": totalData })
    }
  },
  //点击跳转到更多页面
  showMore:function(event){
    var type= event.currentTarget.dataset.listTitle;
    wx.navigateTo({
      url: '/pages/movies/mores/more?type=' + type,
    })
  },
  getInputData:function(event){
    var value=event.detail.value;
    // console.log(value);
      console.log(event);
      var _this = this;
      var value = event.detail.value;
      //调取ajax来获取数据
      var baseUrl = app.globalData.baseUrl;
      var url = baseUrl + "/v2/movie/search?count=12&start=0&q=" + value;
      wx.request({
        url: url,
        header: {
          'content-type': 'json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          _this.searchformatData(res.data.subjects, "", "");
        }
      })
  },
  searchformatData: function (data) {
    var searchsureData = [];
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
      searchsureData.push(obj);
    }
    // var obj = {};
    // obj[type] = sureData;
    // this.setData(obj);
    console.log(searchsureData);
    this.setData({ "data": searchsureData });

  },

  searchMovie:function(){
    this.setData({is_search:true});
  },
  closeSearch:function(){
    this.setData({ is_search: false });
  },
  

  //点击显示详细页面
  showDetail:function(event){
    var movieId=event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '/pages/movies/details/detail?movieId=' +movieId,
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