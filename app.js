var express = require('express');	
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

var app = express();

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

// bower
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));

// statics
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
	var context = {
		title: 'Matrix Game',
		message: 'Welcome to Matrix Game'
	}
	res.render('index', context);
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

module.exports = app;