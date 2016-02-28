var Grid = function(columns, rows, control){
	columns = columns || 10;
	rows = rows || 10;
	var self = {};
	
	self.element = $('<table class="table table-bordered"></table>');
	
	for (var r = 0; r < rows; r++) {
		var row = $('<tr></tr>');
		for (var c = 0; c < columns; c++) {
			var cell = $('<td></td>');
			cell.attr('x', c);
			cell.attr('y', r);
			cell.click(function(e){
				var sessionid = $('#sessionid').val();
				var blocks = parseInt($('#blocks').val()) || 0;
				var color = control.val();
				console.log('click en '+$(this).attr('x')+':'+$(this).attr('y')+'; color: '+control.val());
				if(color != '' && color != undefined && sessionid != '' && sessionid != undefined && blocks > 0){
					console.log('event pint');
					window.client.emit('pint', {
						x: $(this).attr('x'),
						y: $(this).attr('y'),
						color: color,
						sessionid: sessionid
					});
					//$(this).css('background-color', control.val());
				}
			});
			row.append(cell);
		}
		self.element.append(row);
	}
	
	self.render = function(father){
		father.append(self.element);
	};
	
	self.pint = function(x,y,color){
		console.log('pinting... '+color);
		self.element.find('tr:eq('+y+') td:eq('+x+')').css('background-color', color);
	};
	
	return self;
}