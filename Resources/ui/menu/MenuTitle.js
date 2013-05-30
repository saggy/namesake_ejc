function MenuTitle(_args){
	var title = _args.title;
	var self = Ti.UI.createLabel({
		zIndex: 3,
  		top: 50,
  		left: 0,
  		width:300,
  		height:50,
  		color: '#FFFFFF',
  		backgroundColor:'#0096DE',
  		text: title,
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	return self;
}

module.exports = MenuTitle;
