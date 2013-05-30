function ToolsBar(_args){
	var items = _args.items
	var self = Ti.UI.iOS.createTabbedBar({
		zIndex: 3,
		labels: items,
		backgroundColor: '#0096DE',
		top: 50,
		style: Ti.UI.iPhone.SystemButtonStyle.BAR,
		height: 50,
		width: 400
	});
	
	return self;
}

module.exports = ToolsBar;