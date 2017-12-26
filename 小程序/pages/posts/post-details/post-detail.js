// pages/posts/post-details/post-detail.js
var postList = require("../../../data/post-data.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:"",
    judge:false,
    postId:-1,
    musicImgUrl:"/images/music/music-start.png",
    playJudge:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.isPlay);
    //点击的是否是刚才点击的那一条数据
    if(app.globalData.postId==options.postId){
      if (app.globalData.isPlay) {
        this.setData({ musicImgUrl: "/images/music/music-stop.png" })
      } else {
        this.setData({ musicImgUrl: "/images/music/music-start.png" })
      }
    }
  
    //监听音乐是否播放
    wx.onBackgroundAudioPlay(()=>{
      this.setData({ playJudge: true, musicImgUrl: "/images/music/music-stop.png"})
      //同步全局状态
      app.globalData.isPlay=true;
    });
    wx.onBackgroundAudioPause(()=>{
      this.setData({ playJudge: false, musicImgUrl: "/images/music/music-start.png"})
      app.globalData.isPlay = false;
    });
    // console.log(options);
    if (postList.postList[options.postId]==undefined){
      postList.postList[options.postId]={};
    }else{
      this.setData({postId:options.postId});
      this.setData(postList.postList[options.postId]);
    }
    
    //读取缓存的状态
    var judge = wx.getStorageSync(this.data.postId).judge;
    console.log(judge);
    if(judge!=undefined){
      this.setData({judge:judge});
    }
  },
  collected:function(){
    var postId = this.data.postId
    //是否收藏
    var _this=this;
    wx.showModal({
      title: '收藏',
      content: _this.data.judge ?'是否取消收藏该文章？':'是否收藏该文章',
      success: function (res) {
        if (res.confirm) {
          if (_this.data.judge) {
            //设置缓存状态
            _this.setData({ judge: false });
            var obj = { "judge": false }
            wx.setStorageSync(postId, obj);
            //取消收藏
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 2000
            })
          } else {
            
            _this.setData({ judge: true });
            var obj = { "judge": true }
            wx.setStorageSync(postId, obj);
            //收藏成功
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



    //设置缓存
    //判断之前的状态
    
    
    
  },
  showShare:function(){
    wx.showActionSheet({
      itemList: ['分享微博', '分享到朋友圈', '发送朋友'],
      success: function (res) {
        console.log(res.tapIndex)
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  playMusic:function(){
     
        //音乐在播放
        this.setData({ playJudge:!this.data.playJudge});
        app.globalData.isPlay=!this.data.playJudge;
        app.globalData.postId=this.data.postId;
        if(this.data.playJudge){
          //播放音乐
          
          this.setData({ musicImgUrl: "/images/music/music-stop.png"})
          wx.playBackgroundAudio({
            dataUrl: this.data.musicUrl,
            title: this.data.musicTitle,
            coverImgUrl: this.data.musicUrl
          })
        }else{
          //暂停音乐
          this.setData({ musicImgUrl: "/images/music/music-start.png" });
          // console.log(this.data.musicUrl);
          wx.pauseBackgroundAudio();
         
        }
      
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