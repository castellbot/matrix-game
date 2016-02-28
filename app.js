var express = require('express');	
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var expressSession = require('express-session');
var User = require('./user');

var app = express();

app.locals.users = [];
app.locals.maxCounter = 30;
app.locals.counter = app.locals.maxCounter;
app.locals.matrix = new Array();
app.locals.images = new Array();
app.locals.images.push('table.jpg');
app.locals.images.push('car.png');
app.locals.images.push('hat.jpg');
app.locals.image = "/images/table.jpg";

setInterval(function(){
	if(app.locals.counter <= 0){
		app.locals.counter = app.locals.maxCounter;
	}else{
		--app.locals.counter;
	}
	// console.log('Count: %s', app.locals.counter);
}, 1000);

var Cell = function(x, y, color){
	this.x = x;
	this.y = y;
	this.color = color;
};

for (var x = 0; x < 30; x++) {
	var my = new Array();
	for(var y = 0; y < 30; y++){
		my.push(new Cell(x, y, undefined));
	}
	app.locals.matrix.push(my);
}

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// less
app.use(require('less-middleware')(path.join(__dirname, 'public')));

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret: 'M4tr!X64m3', cookie: { maxAge: 120000}}));

// bower
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));

// statics
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
	var context = {
		title: 'Matrix Game',
		message: 'Welcome to Matrix Game',
		user: req.session.user,
		users: app.locals.users,
		image: app.locals.image
	}
	res.render('index', context);
});

app.post('/login', function(req, res, next){
	//res.send("Usuario: " + req.body.username);
	var username = req.body.username;
	if(app.locals.users.indexOf(username) == -1){
		// req.session.username = username;
		var user = new User(username, 10, '', 0);
		req.session.user = user;
		req.session.user.sessionid = req.sessionID;
		app.locals.users.push(user);
	}
	res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
if (app.get('env') === 'development') {
	// development error handler
	// will print stacktrace
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}else{
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

app.pint = function(cb){
	// console.log(data);
	cb(app.locals.users);
	// users.forEach(function(user, index, array) {
	// 	if(user.sessionid === data.sessionid){
	// 		user.less();
	// 		cb();
	// 	}
	// });
};

app.updateMatrix = function(x,y,color){
	var valid = false;
	app.locals.matrix[x][y].color = color;
	// if(matrix[x][y].color != undefined){
	// 	matrix[x][y].color = color;
	// 	valid = true;
	// }
	console.log(app.locals.matrix[x][y]);
	return valid;
};

module.exports = app;