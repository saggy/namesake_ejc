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
	
	var self = Ti.UI.createTableView({
		zIndex: 3,
  		top: 100,
  		right: 0,
  		borderRadius:10,
  		width:400,
  		backgroundColor: '#FFFFFF'
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
	self.setData(tableData);
	
	rs.close();
	db.close();
	return self;
};

module.exports = ToolsTable;