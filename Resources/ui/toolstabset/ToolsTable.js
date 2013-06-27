function ToolsTable(_args) {
	var type = _args.type;
	var query = '';
	var _parent = _args.parent;
	var header = '';
	switch(type){
		case 'note':
			query = "SELECT annotation_id, note_html, note_text, page_no, note, row_index FROM annotation WHERE type='note' ORDER BY row_index";
			header = 'Note';
			break;
		case 'bookmark':
			query = "SELECT annotation_id, note_html, note_text, page_no, note, row_index FROM annotation WHERE type='bookmark' ORDER BY row_index";
			header = 'Selected Text';
			break;
		case 'highlight':
			query = "SELECT annotation_id, note_html, note_text, page_no, note, row_index FROM annotation WHERE type='highlight' ORDER BY row_index";
			header = 'Highlighted Text';
			break;
	}
	var db = Ti.Database.open('namesake');
	var rs = db.execute(query);
	var self = Ti.UI.createView({
		top: 50,
		right: 0,
		width: 400,
		height: 400,
		backgroundColor:'#000000',
		borderRadius: 0 
	});
	
		var headerView = Ti.UI.createView({
		top: 5,
		left: 0,
		width: 400,
		height: 40,
		backgroundColor:'#0096DE',
		borderRadius: 5 
	});
	
	self.add(headerView);
	
	var label1 = Ti.UI.createLabel({
  color: 'white',
  font: { fontSize:18 },
  //shadowColor: '#aaa',
  //shadowOffset: {x:2, y:2},
  text: 'Page',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  left: 5,
  	top: 5,
  	width: 75, height: Ti.UI.SIZE
	});
	headerView.add(label1);
	
		var label2 = Ti.UI.createLabel({
  color: '#white',
  font: { fontSize:18 },
  //shadowColor: '#aaa',
  //shadowOffset: {x:2, y:2},
  text: header,
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  left: 80,
  	top: 5,
  	width: 320, height: Ti.UI.SIZE
	});
	headerView.add(label2);
	

	var table = Ti.UI.createTableView({
		height: 310,
		zIndex: 3,
  		top: 40,
  		right: 0,
  		borderRadius:0,
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
//console.log(JSON.stringify(table.data[0].rows));
//		table.deleteRow(index);
		if(typeof table.data[0]!='undefined'){
		var rowData = table.data[0].rows;
		} else {
			_parent.fireEvent('refreshTable', {});
		}
		database.execute(drop, id);
		
		var rs = database.execute('SELECT annotation_id FROM annotation WHERE type=? ORDER BY row_index',type);
		var i = 0;
		while(rs.isValidRow()){
			id = rs.fieldByName('annotation_id');
			database.execute(update, i, id);
			rowData[i].rowIndex = i;
			i++;
			rs.next();
		}
		rs.close();
		
		self.rowCount--;
		//self.fireEvent('resize',{type: type});
		//Ti.App.fireEvent('reload', {});
		database.close();
	});
	
	
	
	
	var ToolsTableRow = require('ui/toolstabset/ToolsTableRow');
	var tableData = [];
	
	var i = 0;

	while(rs.isValidRow()){
		var row = new ToolsTableRow({type: type, id: rs.fieldByName('annotation_id'), index: i, rowIndex: rs.fieldByName('row_index'), 
					noteHtml: rs.fieldByName('note_html'), noteText: rs.fieldByName('note_text'), 
					pageNo : rs.fieldByName('page_no'), note : (type == 'note') ? rs.fieldByName('note') : rs.fieldByName('note_text'), parent : _parent});

		tableData[row.rowIndex] = row;
		rs.next();
		i++;
	}

	self.rowCount = i;
	table.setData(tableData);
	
	//self.add(done);
	//done.hide();
	//self.add(edit);
	self.add(table);
	
	rs.close();
	db.close();
	
	self.addEventListener('editClick',function(e){
		table.moving = true;
		table.editing = true;
	});
	
	self.addEventListener('doneClick',function(e){
		table.moving = false;
		table.editing = false;
	});
	
	return self;
};

module.exports = ToolsTable;