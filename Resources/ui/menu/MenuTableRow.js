function MenuTableRow(_args){
	var index = _args.index, title = _args.title, children = _args.children;
	var self = Ti.UI.createTableViewRow({
		zIndex: 4,
		className: 'forumEvent',
		selectedBackgroundColor : '#0096DE',
		height: 50,
		width: 300,
		rowIndex: index
	});

	var chapter = Ti.UI.createLabel({
		zIndex: 5,
		color: '#FFFFFF',
		backgroundColor: '#FF0000',
		text: title,
		left: 0,
		top: 0,
		width: 300,
		height: 50,
		rowIndex: index
	});

	self.add(chapter);
	if(children){
		var MoreButton = require('ui/controls/MoreButton'),
			moreButton = new MoreButton();
		moreButton.setZIndex(6);
		moreButton.rowIndex = index;
	
		self.add(moreButton);
	}

	return self;
}

module.exports = MenuTableRow;