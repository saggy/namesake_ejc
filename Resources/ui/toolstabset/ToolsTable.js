function ToolsTable(_args) {
	var type = _args.type;
	var query = '';
	switch(type){
		case 'note':
			query = "SELECT annotation_id, note_html, note_text, page_no, note, row_index FROM annotation WHERE type='note' ORDER BY row_index";
			break;
		case 'bookmark':
			query = "SELECT annotation_id, note_html, note_text, page_no, note, row_index FROM annotation WHERE type='bookmark' ORDER BY row_index";
			break;
		case 'highlight':
			query = "SELECT annotation_id, note_html, note_text, page_no, note, row_index FROM annotation WHERE type='highlight' ORDER BY row_index";
			break;
	}
	var db = Ti.Database.open('namesake');
	var rs = db.execute(query);
	var self = Ti.UI.createView({
		top: 100,
		right: 0,
		borderRadius: 10,
		width: 400,
		height: 'auto',
		backgroundColor:'#000000'
	});
	
	var edit = Ti.UI.createButton({
		zIndex: 3,
		top: 0,
		right: 0,
		title: 'Edit'
	});
	edit.addEventListener('click',function(e){
		table.moving = true;
		table.editing = true;
		edit.hide();
		done.show();
	});
	var done = Ti.UI.createButton({
		zIndex: 3,
		top: 0,
		right: 0,
		title: 'Done',
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});
	done.addEventListener('click', function(e){
		table.moving = false;
		table.editing = false;
		done.hide();
		edit.show();
		
	});
	var table = Ti.UI.createTableView({
		height: 'auto',
		zIndex: 3,
  		top: 50,
  		right: 0,
  		borderRadius:10,
  		width:400,
  		backgroundColor: '#FFFFFF',
  		editable: true,
  		moveable: true
	});
	table.addEventListener('move',function(e){
		var database = Ti.Database.open('namesake');
		var query = 'UPDATE annotation SET row_index=? WHERE annotation_id=?';		
		var rowData = table.data[0].rows;
		for(var i in rowData){
			var id = rowData[i].id;
			rowData[i].rowIndex = i;
			database.execute(query, i, id);
			//table.data[0].rows[i].rowIndex = i;
		}
		database.close();
	});
	
	table.addEventListener('delete', function(e){
		var database = Ti.Database.open('namesake');
		var update = 'UPDATE annotation SET row_index=? WHERE annotation_id=?';	
		var drop = 'DELETE FROM annotation WHERE annotation_id=?';
		var index = e.index;
		var id = e.row.id;
		
		table.deleteRow(index, {animationStyle: Ti.UI.iPhone.RowAnimationStyle.UP});
		database.execute(drop, id);
		
		var rs = database.execute('SELECT annotation_id FROM annotation WHERE type=? ORDER BY row_index',type);
		var i = 0;
		while(rs.isValidRow()){
			id = rs.fieldByName('annotation_id');
			database.execute(update, i, id);
			i++;
			rs.next();
		}
		rs.close();
		
		self.rowCount--;
		self.fireEvent('resize',{type: type});
		database.close();
	});
	
	
	
	
	var ToolsTableRow = require('ui/toolstabset/ToolsTableRow');
	var tableData = [];
	
	var i = 0;

	while(rs.isValidRow()){
		var row = new ToolsTableRow({type: type, id: rs.fieldByName('annotation_id'), index: i, rowIndex: rs.fieldByName('row_index'), 
					noteHtml: rs.fieldByName('note_html'), noteText: rs.fieldByName('note_text'), 
					pageNo : rs.fieldByName('page_no'), note : (type == 'note') ? rs.fieldByName('note') : rs.fieldByName('note_text')});

		tableData[row.rowIndex] = row;
		rs.next();
		i++;
	}

	self.rowCount = i;
	table.setData(tableData);
	
	self.add(done);
	done.hide();
	self.add(edit);
	self.add(table);
	
	rs.close();
	db.close();
	return self;
};

module.exports = ToolsTable;