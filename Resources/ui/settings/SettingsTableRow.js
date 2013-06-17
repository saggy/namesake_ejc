function SettingsTableRow(_args){
	var index = _args.index, title = typeof(_args.title) === 'undefined' ? '' : _args.title, bgColor = typeof(_args.backgroundColor) === 'undefined' ? '' : _args.backgroundColor, children = _args.children;
	var sizeFactor = (typeof(_args.sizeFactor) === 'undefined') ? '' : _args.sizeFactor;
	var self = Ti.UI.createTableViewRow({
		zIndex: 4,
		className: 'forumEvent',
		backgroundColor: 'white',
		selectedBackgroundColor : '#0096DE',
		height: 50,
		width: 350,
		hasCheck: _args.hasCheck
	});

	if(title != ''){
		var label = Ti.UI.createLabel({
			zIndex: 5,
			color: 'black',
			backgroundColor: 'white',
			text: title,
			left: 10,
			top: 0,
			width: 300,
			height: 50
		});
	
		if(bgColor != ''){
			var color = Ti.UI.createLabel({
				backgroundColor: bgColor,
				left: 0,
				top: 0,
				width: 50,
				height: 50
			});
			self.add(color);
			self.highlightColor = bgColor;
			label.setLeft(60);
		}
		self.add(label);
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