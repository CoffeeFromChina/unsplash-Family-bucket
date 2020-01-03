//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    pictureArray: [],   // 图片数组
    start: 0,           // 默认查找方式的起始位置
    count: 10,          // 默认查找方式的起始数量
    randomCount: 10,    // 随机获取突破的起始数量
    search:'',          // 要查找的图片
    searchStart: 0,     // 要查找的数据的起始位置
    searchCount: 10,    // 要查找的数据的起始数量
    isSearch: false,    // 配合 onReachBottom() 判断查找更多数据的方式
    searchClass: ''     // 要查找的数据类型
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    var that = this;
    that.setData({
      isSearch: false,    // 设为 false，即之后获取更多数据时采用默认方式
      pictureArray: null, // 重置数据数组
      count: 10,          // 重置获取数据的数量
    })
    console.log("下拉："+that.data.isSearch)
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
          start: that.data.start + 60,  // 每次刷新，在上次刷新的基础上增加 60 步长
          pictureArray: e.data.data     // 重置数据数组
        })
        wx.stopPullDownRefresh();       // 获取完数据后停止刷新事件
      }
    })
  },
  // 页面上拉触底事件
  onReachBottom: function () {
    console.log("上拉加载")
    var that = this;
    that.setData({
      loading: true,  //把"上拉加载"的变量设为false，显示 
    });
    console.log("上拉触底："+that.data.isSearch);
    // 更具 isSearch 类型判断使用哪个方法获取更多数据
    if (that.data.isSearch == false) {
      // 上拉获取更多数据：默认方式
      console.log("reNew")      // 默认调用此函数获取数据
      that.reNew()
    } else {
      console.log("onSearch")
      that.onSearch()
    }
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
    var random = parseInt(Math.random()*10000); //设置随机获取数据的起始位置
    that.setData({
      start:random
    })
    this.reNew();
  },
  // 获取网站图片统计信息
  onShow: function () {   // 似乎邮电鸡肋，先不管这个函数，总之不影响程序运行
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
    var full = e.currentTarget.dataset.full;    // 获取图片的超高清链接
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
          start: that.data.start+10,                                // 设置获取数据的起始位置 
          pictureArray: that.data.pictureArray.concat(e.data.data)  // 添加数据
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
    var rawurl = e.currentTarget.dataset.raw;   // 获取要预览的图片的链接
    wx.previewImage({
      urls: [rawurl],             // 设置 urls；可设置多个。
      success: function(res) {
        console.log("查看成功")
      },
    })
  },
  // 查询图片
  onSearch: function(e){
    var that = this    
    var detail = ''
    // 在搜索后，向下滑动时不会传入数据 e，这里就判断是否有要搜索的参数
    // 没有就获取之前的搜索参数
    if (typeof (e) == "undefined"){   // 判空
      detail = that.data.searchClass; // 赋上次搜索的数据
    }else{
      detail = e.detail;  // 获取上次搜索时的参数
      that.setData({      // 再次获取到要搜索的数据时，重置查找的数量。
        searchStart: 0,   // 重置起始位置
        pictureArray: []  // 重置数组
      })
    }
    wx.request({
        url: 'https://xuuuuucong.top/unsplashapi/inquire/' + detail + '/' + that.data.searchStart + '/' + that.data.searchCount,
      success: function (e) {
        console.log(e)
        that.setData({
          isSearch: true,
          searchClass: detail,
          searchStart: that.data.searchStart+10,
          pictureArray: that.data.pictureArray.concat(e.data.data)
        })
      }
    })
  }
})