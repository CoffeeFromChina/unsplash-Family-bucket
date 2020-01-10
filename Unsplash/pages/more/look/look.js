// pages/more/look/look.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    count: 10,
    openid: '',
    pictureArray: [],   // 图片数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getLook()
  },

  getLook: function () {
    var that = this
    wx.request({
      url: 'https://xuuuuucong.top/unsplashapi/watch/' + app.globalData.openid + '/' + that.data.start + '/' + that.data.count,
      success: function (e) {
        console.log(e)
        if (e.data.data.length > 0) {
          that.setData({
            pictureArray: that.data.pictureArray.concat(e.data.data),
            start: that.data.start + 10,
          })
        }
      }
    })
  },
  
  // 预览图片
  previewImg: function (e) {
    console.log(e);
    var rawurl = e.currentTarget.dataset.raw;   // 获取要预览的图片的链接
    wx.previewImage({
      urls: [rawurl],             // 设置 urls；可设置多个。
      success: function (res) {
        console.log("查看成功")
      },
    })
  },
  // 复制图片链接到剪切板，供用户用浏览器下载
  click: function (e) {
    console.log(e);
    var full = e.currentTarget.dataset.full;    // 获取图片的超高清链接
    wx.setClipboardData({
      data: full,
    })
  },
  // 回到顶部
  goUp: function (e) {
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
    var that = this;
    that.setData({
      pictureArray: [],   // 重置数据数组
      start: 0,           // 重置获取数据的数量
    })
    that.getLook()
    wx.stopPullDownRefresh(); // 获取完数据后停止刷新事件
    console.log("刷新完成")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.getLook()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})