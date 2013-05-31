function ToolsTableRow(_args){
	var type = _args.type, id = _args.id, rowIndex = _args.rowIndex, noteHtml = _args.noteHtml, noteText = _args.noteText, 
			pageNo = _args.pageNo, note = _args.note;
	var self = Ti.UI.createTableViewRow({
		className: 'forumEvent',
		selectedBackgroundColor : '#0096DE',
		height: 50,
		width: 400,
		id: id,
		rowIndex: rowIndex,
		noteHtml: noteHtml,
		noteText: noteText,
		pageNo: pageNo,
		note: note
	});
	

	var pageLabel = Ti.UI.createLabel({
		left: 0,
		width: 50,
		backgroundColor: '#000000',
		color: '#FFFFFF',
		text: 'p. '+ pageNo,
		id: id,
		rowIndex: rowIndex,
		noteHtml: noteHtml,
		noteText: noteText,
		pageNo: pageNo,
		note: note
	});

	var noteLabel = Ti.UI.createLabel({
		color: '#FFFFFF',
		backgroundColor:'#0096DE',
		text: note,
		left: 50,
		right: 0,
		top: 0,
		width: 350,
		height: 50,
		id: id,
		rowIndex: rowIndex,
		noteText: noteHtml,
		noteText: noteText,
		pageNo: pageNo,
		note: note
	});
	
	pageLabel.addEventListener('click', function(e){
		Ti.App.fireEvent('gotopage', {pageNo: self.pageNo});
	});

		noteLabel.addEventListener('click', function(e){
		Ti.App.fireEvent('gotopage', {pageNo: self.pageNo});
		});
	
	self.add(noteLabel);
	self.add(pageLabel);


	return self;
}

module.exports = ToolsTableRow;
