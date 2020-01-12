var createError = require('http-errors');
var express = require('express');
var request = require('request')
var fs = require('fs')
var url = require('url');
var process = require('child_process');
var querystring = require("querystring");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var UT = require('./wx.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));	
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/public/images/:fileName', function (req, res) {
	var fileName = req.params.fileName;
	var filePath = path.join('./public/images', fileName);

	var stats = fs.statSync(filePath); 
	res.download(filePath);
	
	// 下面是初始化项目时就存在的代码
	//res.sendfile( __dirname + "/" + req.url );
	//console.log("Request for " + req.url + " received.");
})
// 下载图片
app.get('/getImg',function (req, res){
	//获取返回的url对象的query属性值 
	var arg = url.parse(req.url).query;
	//将arg参数字符串反序列化为一个对象
	var params = querystring.parse(arg);
	console.log(params.uri)
	let opts = {
      url: params.uri,
    }; 
	var num = Math.round(Math.random()*100000);
    let path = "./public/images/"+num+".jpg";
	
	UT.downImg(opts, path,res);
	var obj = {"num":num};
	res.end(JSON.stringify(obj));
 });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//var download = function(uri, filename, callback){
 // request.head(uri, function(err, res, body){
   // console.log('content-type:', res.headers['content-type']);
//    console.log('content-length:', res.headers['content-length']);
 //   request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
 // });
//};

module.exports = app;
