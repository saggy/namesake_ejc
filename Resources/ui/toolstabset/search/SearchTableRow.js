function SearchTableRow(_args){
	var type = _args.type, pageNo = typeof(_args.pageNo) === 'undefined' ? '' : _args.pageNo, bookText = typeof(_args.bookText) === 'undefined' ? '' : _args.bookText, 
		verse = typeof(_args.verse) === 'undefined' ? '' : _args.verse, verseText = typeof(_args.verseText) === 'undefined' ? '' : _args.verseText, 
		url = typeof(_args.url) === undefined ? '' : _args.url, storeTitle = typeof(_args.storeTitle) === 'undefined' ? '' : _args.storeTitle, 
		imageLoc = typeof(_args.imageLoc) === 'undefined' ? '' : _args.imageLoc;
	var searchTerm = _args.searchTerm;
		
	var self = Ti.UI.createTableViewRow({
		zIndex:5,
		className: 'forumEvent',
		selectedBackgroundColor : '#0096DE',
		height: 50,
		width: 400,
		leftImage: imageLoc,
		color: 'black',
		backgroundColor: 'white'
	});
	

	if(imageLoc == ''){
		var pageLabel = Ti.UI.createLabel({
			left: 0,
			width: 80,
			height: 50,
			backgroundColor: '#0096DE',
			color: '#FFFFFF',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		});
	}

	var noteLabel = Ti.UI.createLabel({
		color: 'black',
		backgroundColor:'white',
		right: 0,
		top: 0,
		width: 300,
		height: 50
	});
	
	var pageLabelText='', noteLabelText='';
	switch(type){
		case 'book':
			pageLabelText = 'p. ' + pageNo;
			self.addEventListener('click', function(e){
				self.fireEvent('hideTools');
				Ti.App.fireEvent('gotopage', {pageNo: pageNo, searchTerm: searchTerm});

			});
			noteLabelText = bookText;
			break;
		case 'bible':
			pageLabelText = verse;
			self.addEventListener('click', function(e){
				Ti.App.fireEvent('biblepop', {verse: verse, searchTerm: searchTerm});
			});
			noteLabelText = verseText;
			break;
		case 'store':
			noteLabelText = storeTitle;
			break;
	}

	noteLabel.text = noteLabelText;
	self.add(noteLabel);

	if(imageLoc == ''){
		pageLabel.text = pageLabelText;
		self.add(pageLabel);
	}

	return self;
}

module.exports = SearchTableRow;
