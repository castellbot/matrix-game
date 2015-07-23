var env = process.env.NODE_ENV || 'production';

var http = require('http'),
	app = require('./app'),
	config = require('./config');

if (env != 'production') {
	console.log('Development enviroment');
}

var server = http.createServer(app).listen(config.port);
console.log('Server running on %s', config.port);