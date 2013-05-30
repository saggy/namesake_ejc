function VideoTableRow(_args){
	var index = _args.index,title = _args.title, imageLoc = _args.imageLoc;
	var self = Ti.UI.createTableViewRow({
		zIndex: 4,
		className: 'forumEvent',
		selectedBackgroundColor : '#0096DE',
		rowIndex: index,
		height: 50,
		width: 400
	});
	
	var image = Ti.UI.createImageView({
		zIndex: 5,
		left: 0,
		width: 100,
		image: imageLoc,
		rowIndex: index
	})

	var label = Ti.UI.createLabel({
		zIndex: 5,
		color: '#FFFFFF',
		backgroundColor: '#FF0000',
		text: title,
		right: 0,
		top: 0,
		width: 300,
		height: 50,
		rowIndex: index
	});
	
	self.add(image);
	self.add(label);

	return self;
}

module.exports = VideoTableRow;