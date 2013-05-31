function ToolsTableRow(_args){
	var type = _args.type, id = _args.id, rowIndex = _args.rowIndex, noteHtml = _args.noteHtml, noteText = _args.noteText, 
			pageNo = _args.pageNo, note = _args.note;
	var self = Ti.UI.createTableViewRow({
		zIndex: 4,
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
		zIndex: 5,
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
		zIndex: 5,
		color: '#FFFFFF',
		backgroundColor: '#FF0000',
		text: note,
		right: 0,
		top: 0,
		width: 300,
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
