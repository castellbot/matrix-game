 var main = function(argument){
	 console.log('init game');
	 
	 var matrix = new Grid(30,30, $('#id_color'));
	 matrix.render($('#matrixwrapper'));
	 
	 window.client = io.connect(window.location.href);
	 
	 window.client.on('pint', function(data){
		 matrix.pint(data.x, data.y, data.color);
	 });
	 window.client.on('timer', function(data){
		//  console.log(data);
		 $('#timer').html(data.counter);
	 });
	 window.client.on('update', function(data){
		 //matrix.pint(data.x, data.y, data.color);
		 console.log(data);
		 $('#spanblocks').html(data.blocks);
		 $('#blocks').val(data.blocks);
	 });
	 window.client.on('image', function(data){
		  $('#image').attr('src', data.image);
	 });
	 
	 var sessionid = $('#sessionid').val();
	 if(sessionid == undefined){
		 $('#myModal').modal('show');
		 $('#username').focus();
	 }
 }
 
 function setColor(element){
	//  $('#id_color').val(rgb2hex($(element).css('backgroundColor')));
	 $('#id_color').val(element);
	 $('#id_title_username').css('background-color', $('#id_color').val());
	//  console.log("set color: "+ $('#id_color').val());
 }
 
 function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    var color = '#' + parts.join('');
	console.log(color);
	return color;
}

function rgb2hex(orig){
	var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
	var color = (rgb && rgb.length === 4) ? "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
	console.log(color);
	return color;
}

$(document).on('ready', main);