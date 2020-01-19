// pages/more/sever/sever.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureArray: [],   // 图片数组
    start: 0,           // 默认查找方式的起始位置
    count: 10,          // 默认查找方式的起始数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从服务器获取已经下载到服务器的图片
    var that = this;
    that.getOpenid()
    that.getSeverDownPicture()
  },
  getSeverDownPicture: function(e){
    var that = this
    wx.request({
      url: 'https://xuuuuucong.top/unsplashapi/getDown/'+that.data.start+'/'+that.data.count,
      success:function(e){
        console.log(e)
        that.setData({
          start: that.data.start + 10,                                // 设置获取数据的起始位置 
          pictureArray: that.data.pictureArray.concat(e.data.data), // 添加数据
        })
      }
    })
  },

  // 预览图片
  previewImg: function (e) {
    var that = this
    console.log(e);
    var rawurl = e.currentTarget.dataset.raw;   // 获取要预览的图片的链接

    wx.previewImage({
      urls: [rawurl], 
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

  down: function(e){
      var that = this
      console.log(e)
      var picid = e.currentTarget.dataset.id
      wx.showToast({
        title: '正在下载！',
      })
      wx.downloadFile({
        url: 'https://unsplash.xuuuuucong.top/public/images/' + picid + '.jpg',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (dres) {
              console.log("这是下载成功了：" + dres)
            }
          })
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
    var that = this
    that.getSeverDownPicture()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getOpenid() {
    var that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',  // 云函数名称
      complete: res => {
        console.log(res.result)
        app.globalData.openid = res.result.openid   // 页面初次加载时就设置全局的 openid,方便其他页面使用
        console.log('云函数获取到的openid: ', app.globalData.openid)
      }
    })
  },
})