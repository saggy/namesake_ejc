function ToolsTable(_args) {
	var type = _args.type;
	var query = '';
	switch(type){
		case 'note':
			query = "SELECT note_html, note_text, page_no, note FROM annotation WHERE type='note' ORDER BY modify_date DESC";
			break;
		case 'bookmark':
			query = "SELECT note_html, note_text, page_no, note FROM annotation WHERE type='bookmark' ORDER BY modify_date DESC";
			break;
		case 'highlight':
			query = "SELECT note_html, note_text, page_no, note FROM annotation WHERE type='highlight' ORDER BY modify_date DESC";
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
		var row = new ToolsTableRow({type: type, index: i, noteHtml: rs.fieldByName('note_html'), noteText: rs.fieldByName('note_text'), 
					pageNo : rs.fieldByName('page_no'), note : (type == 'note') ? rs.fieldByName('note') : rs.fieldByName('note_text')});

		tableData.push(row);
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