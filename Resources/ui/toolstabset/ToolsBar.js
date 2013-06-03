function ToolsBar(_args){
	var items = _args.items
	var self = Ti.UI.iOS.createTabbedBar({
		labels: items,
		backgroundColor: '#0096DE',
		style: Ti.UI.iPhone.SystemButtonStyle.BAR,
		top: 5,
		height: 40,
		width: '95%',
		borderRadius: 0
	});
	
	return self;
}

module.exports = ToolsBar;