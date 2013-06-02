function SearchTableRow(_args){
	var type = _args.type, pageNo = typeof(_args.pageNo) === 'undefined' ? '' : _args.pageNo, bookText = typeof(_args.bookText) === 'undefined' ? '' : _args.bookText, 
		verse = typeof(_args.verse) === 'undefined' ? '' : _args.verse, verseText = typeof(_args.verseText) === 'undefined' ? '' : _args.verseText, 
		url = typeof(_args.url) === undefined ? '' : _args.url, storeTitle = typeof(_args.storeTitle) === 'undefined' ? '' : _args.storeTitle, 
		imageLoc = typeof(_args.imageLoc) === 'undefined' ? '' : _args.imageLoc;
		
	var self = Ti.UI.createTableViewRow({
		zIndex:5,
		className: 'forumEvent',
		selectedBackgroundColor : '#0096DE',
		height: 50,
		width: 400
	});
	

	var pageLabel = Ti.UI.createLabel({
		left: 0,
		width: 50,
		backgroundColor: '#000000',
		color: '#FFFFFF'
	});

	var noteLabel = Ti.UI.createLabel({
		color: '#FFFFFF',
		backgroundColor:'#0096DE',
		left: 50,
		right: 0,
		top: 0,
		width: 350,
		height: 50
	});
	
	var pageLabelText='', noteLabelText='';
	switch(type){
		case 'book':
			pageLabelText = 'p. ' + pageNo;
			pageLabel.addEventListener('click', function(e){
				Ti.App.fireEvent('gotopage', {pageNo: self.pageNo});
			});
			noteLabelText = bookText;
			break;
		case 'bible':
			pageLabelText = verse;
			pageLabel.addEventListener('click', function(e){
				Ti.App.fireEvent('biblepop', {verse: verse});
			});
			noteLabelText = verseText;
			break;
		case 'store':
			pageLabel = Ti.UI.createImageView({
				left: 0,
				width: 50,
				image: imageLoc,
				text: ''
			});
			noteLabelText = verseText;
			break;
	}

	pageLabel.setText(pageLabelText);
	noteLabel.setText(noteLabelText);

	self.add(noteLabel);
	self.add(pageLabel);


	return self;
}

module.exports = SearchTableRow;
