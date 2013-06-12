function SettingsTableRow(_args){
	var index = _args.index, title = typeof(_args.title) === 'undefined' ? '' : _args.title, bgColor = typeof(_args.backgroundColor) === 'undefined' ? '' : _args.backgroundColor, children = _args.children;
	var sizeFactor = (typeof(_args.sizeFactor) === 'undefined') ? '' : _args.sizeFactor;
	var self = Ti.UI.createTableViewRow({
		zIndex: 4,
		className: 'forumEvent',
		backgroundColor: (bgColor != '') ? bgColor : 'white',
		selectedBackgroundColor : '#0096DE',
		height: 50,
		width: 350
	});

	if(title != ''){
		var chapter = Ti.UI.createLabel({
			zIndex: 5,
			color: 'black',
			backgroundColor: 'white',
			text: title,
			left: 10,
			top: 0,
			width: 300,
			height: 50
		});
	
		self.add(chapter);
	
	}	
	if(children){
		/*var MoreButton = require('ui/controls/MoreButton'),
			moreButton = new MoreButton();
		moreButton.setZIndex(6);
		moreButton.rowIndex = index;
	
		self.add(moreButton);
		*/
		self.hasDetail = true;
	}

	self.rowIndex = index;
	return self;
}

module.exports = SettingsTableRow;