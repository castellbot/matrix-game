var env = process.env.NODE_ENV || 'production';

var http = require('http'),
	app = require('./app'),
	config = require('./config'),
	io = require('socket.io');

if (env != 'production') {
	console.log('Development enviroment');
}

var server = http.createServer(app);

var sockets = io.listen(server);

setInterval(function(){
	var data = {};
	data.counter = app.locals.counter;
	data.reset = app.locals.counter == 0 ? true : false;
	// console.log(data);
	sockets.emit('timer', data);
	if(app.locals.counter == app.locals.maxCounter){
		var data2 = {};
		var index = Math.floor(Math.random() * (app.locals.images.length - 0)) + 0;
		data2.image = '/images/'+app.locals.images[index];
		console.log('index:'+index+', image: '+data2.image);
		app.locals.image = data2.image;
		sockets.emit('image', data2);
	}
	console.log(app.locals.counter);
}, 1000);

sockets.on('connection', function(socket){
	console.log('socket connection...');
	socket.on('pint', function(data){
		console.log(data);
		app.pint(function(users){
			users.forEach(function(user, index, array) {
				console.log(user);
				if(user.sessionid === data.sessionid){
					user.less();
					if(user.blocks >= 0){
						socket.emit('update', {blocks: user.blocks});
						// socket.broadcast.emit('pint', data);
						// if(app.updateMatrix(data.x, data.y, data.color)){
						// }
						app.updateMatrix(data.x, data.y, data.color);
						sockets.emit('pint', data);
					}else{
						socket.emit('update', {blocks: 0});
					}
				}
			});
		});
	});
	// setInterval(function(){
	// 	// var data = {};
	// 	// data.counter = counter;
	// 	// data.reset = counter == 0 ? true : false;
	// 	// // console.log(data);
	// 	// socket.emit('timer', data);
	// 	console.log(app.locals.counter);
	// }, 1000);
});

server.listen(config.port);
console.log('Server running on %s', config.port);