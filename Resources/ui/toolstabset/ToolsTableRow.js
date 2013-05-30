function ToolsTableRow(_args){
	var type = _args.type, index = _args.index, noteHtml = _args.noteHtml, noteText = _args.noteText, 
			pageNo = _args.pageNo, note = _args.note;
	var self = Ti.UI.createTableViewRow({
		zIndex: 4,
		className: 'forumEvent',
		selectedBackgroundColor : '#0096DE',
		height: 50,
		width: 400,
		rowIndex: index,
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
		rowIndex: index,
		noteHtml: noteHtml,
		noteText: noteText,
		pageNo: pageNo,
		note: note
	})

	var noteLabel = Ti.UI.createLabel({
		zIndex: 5,
		color: '#FFFFFF',
		backgroundColor: '#FF0000',
		text: note,
		right: 0,
		top: 0,
		width: 350,
		height: 50,
		rowIndex: index,
		noteText: noteHtml,
		noteText: noteText,
		pageNo: pageNo,
		note: note
	});
	
	pageLabel.addEventListener('click', function(e){
		Ti.App.fireEvent('gotopage', {pageNo: self.pageNo});
	});
	if(type == 'note'){
		noteLabel.addEventListener('click',function(e){
			var ev = { text: self.noteText, html: self.noteHtml}
			Ti.App.fireEvent('editnote', ev);
		});
		
	}
	self.add(noteLabel);
	self.add(pageLabel);


	return self;
}

module.exports = ToolsTableRow;