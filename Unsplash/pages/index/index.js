//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    pictureArray: [],
    start: 0,
    count: 10,
    randomCount: 10,
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    let that = this;
    that.setData({
      pictureArray: null,
      count: 10,
    })
    that.gainLoadingListData()
  },
  // 刷新数据
  gainLoadingListData: function(e){
    var that = this
    wx.request({
      url: 'https://xuuuuucong.top/unsplashapi/limit/' + that.data.start + '/' + that.data.count,
      success: function (e) {
        console.log(e)
        that.setData({
          start: that.data.start + 60,
          pictureArray: e.data.data
        })
        wx.stopPullDownRefresh(); // 获取完数据后通知刷新事件
      }
    })
  },
  // 页面上拉触底事件
  onReachBottom: function () {
    console.log("上拉加载")
    let that = this;
    that.setData({
      loading: true,  //把"上拉加载"的变量设为false，显示 
    })
    // 上拉获取更多数据
    that.reNew()
  },
  // 回到顶部
  goUp:function(e){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 先在小程序注册完成后加载数据，再用
  onLoad: function(){
    var that = this;
    var random = parseInt(Math.random()*10000);
    that.setData({
      start:random
    })
    this.reNew();
  },
  // 获取网站图片统计信息
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://xuuuuucong.top/unsplashapi/total',
      success: function (e) {
        that.setData({
          total: (e.data.data) / 5
        })
        console.log("total：" + that.data.total)
      }
    })
  },
  // 复制图片链接到剪切板，供用户用浏览器下载
  click:function(e){
    console.log(e);
    var full = e.currentTarget.dataset.full;
    wx.setClipboardData({
      data: full,
    })
  },
  // 程序启动时加载图片数据
  reNew: function() {
    var that = this
    wx.request({
      url: 'https://xuuuuucong.top/unsplashapi/limit/'+that.data.start+'/'+that.data.count,
      success: function(e) {
        console.log(e)
        that.setData({
          start: that.data.start + 10,
          pictureArray: that.data.pictureArray.concat(e.data.data)
        })
      }
    })
  },
  // 随机获取多张图片。暂时存在问题（服务器端获取的数据部分字段被制空，但这个函数是正确的，问题出在服务器端）
  random: function(){
    var that = this;
    wx.request({
      url: 'https://xuuuuucong.top/unsplashapi/random/' + that.data.randomCount,
      success: function(res){
        that.setData({  // 向原数组中加入数据
          pictureArray: that.data.pictureArray.concat(res.data.data),
        })
        console.log(res)
      }
    })
  },
  // 预览图片
  previewImg: function(e) {
    console.log(e);
    var rawurl = e.currentTarget.dataset.raw;
    wx.previewImage({
      urls: [rawurl],
      success: function(res) {
        console.log("查看成功")
      },
      fail: function(res) {
        console.log("查看失败")
      },
      complete: function(res) {},
    })
  },
})