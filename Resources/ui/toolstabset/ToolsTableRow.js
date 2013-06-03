function ToolsTableRow(_args){
	var type = _args.type, id = _args.id, rowIndex = _args.rowIndex, noteHtml = _args.noteHtml, noteText = _args.noteText, 
			pageNo = _args.pageNo, note = _args.note;
	var _parent = _args.parent;
	
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
	

	var pageLabel = Ti.UI.createView({
		left: 0,
		width: 80,
		id: id,
		rowIndex: rowIndex,
		noteHtml: noteHtml,
		noteText: noteText,
		pageNo: pageNo,
		note: note,
		backgroundColor: '#0096DE'
	});
	
	var pageNum = Ti.UI.createLabel({
		backgroundColor: '#0096DE',
		color: '#FFFFFF',
		text: 'p. ' +pageNo
	});

	pageLabel.add(pageNum);
	
	var noteLabel = Ti.UI.createLabel({
		color: 'black',
		backgroundColor:'white',
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
	
	self.addEventListener('click', function(e){
		_parent.hide();
		Ti.App.fireEvent('gotopage', {pageNo: self.pageNo});
	});

/*
		noteLabel.addEventListener('click', function(e){
		Ti.App.fireEvent('gotopage', {pageNo: self.pageNo});
		});
		*/
	
	self.add(noteLabel);
	self.add(pageLabel);


	return self;
}

module.exports = ToolsTableRow;
