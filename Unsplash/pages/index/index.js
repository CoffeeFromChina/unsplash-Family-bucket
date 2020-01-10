//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    pictureArray: [],   // 图片数组
    start: 0,           // 默认查找方式的起始位置
    count: 10,          // 默认查找方式的起始数量
    hiddenn: true,      // 控制搜索框的隐藏
    randomCount: 10,    // 随机获取图片的起始数量
    search:'',          // 要查找的图片
    searchStart: 0,     // 要查找的数据的起始位置
    searchCount: 10,    // 要查找的数据的起始数量
    isSearch: false,    // 配合 onReachBottom() 判断查找更多数据的方式
    searchClass: '',    // 要查找的数据类型
    openid: '',
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    var that = this;
    that.setData({
      isSearch: false,    // 设为 false，即之后获取更多数据时采用默认方式
      pictureArray: [], // 重置数据数组
      count: 10,          // 重置获取数据的数量
      hiddenn: true       // 隐藏搜索框 
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
  // 隐/显搜索框
  hiddennInput:function(){
    var that = this
    var hiddenn = that.data.hiddenn
    if(hiddenn){
      that.setData({
        hiddenn: false
      })
    }else{
      that.setData({
        hiddenn: true
      })
    }
    console.log(that.data.hiddenn)
  },
  // 先在小程序注册完成后加载数据，再用
  onLoad: function(){
    var that = this;
    that.getOpenid()
    var random = parseInt(Math.random()*10000); //设置随机获取数据的起始位置
    that.setData({
      start:random
    })
    this.reNew();
  },
  onShow: function () {
  },
  // 复制图片链接到剪切板，供用户用浏览器下载
  click:function(e){
    console.log(e);
    var full = e.currentTarget.dataset.full;    // 获取图片的超高清链接
    wx.setClipboardData({
      data: full,
    })
  },
  // 程序启动时加载图片数据。默认的图片加载函数
  reNew: function() {
    var that = this
    wx.request({  
      url: 'https://xuuuuucong.top/unsplashapi/limit/'+that.data.start+'/'+that.data.count,
      success: function(e) {
        if (!that.data.hiddenn) {
          that.setData({
            hiddenn: false,
          })
        }
        console.log(e)
        if (e.data.data.length > 0) {
          that.setData({
            start: that.data.start+10,                                // 设置获取数据的起始位置 
            pictureArray: that.data.pictureArray.concat(e.data.data), // 添加数据
          })
        }
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
        if (e.data.data.length > 0) {
          that.setData({
            isSearch: true,
            hiddenn: true,
            searchClass: detail,
            searchStart: that.data.searchStart + 10,
            pictureArray: that.data.pictureArray.concat(e.data.data)
          })
        }        
      }
    })
  },
  // 搜索框==》取消
  cancelSearch: function(e){
    var that = this;
    that.hiddennInput();
  },
  like:function(e){
    var that = this
    // 检查是否有用户信息，没有就跳转 my 页面进行登录
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '请登录',
        content: '点击确定，前往 my 页面登录',
        success:function(res){
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        }
      })
    }else{
      var picId = e.currentTarget.dataset.id
      console.log(picId)
      console.log(that.data.openid)
      wx.request({
        url: 'https://xuuuuucong.top/unsplashapi/like/' + app.globalData.openid + '/' + picId,
        success: function (e) {
          console.log("hha" + e)
        }
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000
      })
    }
  },
  // 使用云函数获取用户openid
  // 参考文章 https://cloud.tencent.com/document/product/876/32313
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