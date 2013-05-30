function ToolsTab(_args) {
	var tabText = _args.text;
	var self = Titanium.UI.createLabel({height: 38, width: 80, top: 0, left:0, 
		backgroundColor: '#0096DE',
		color: '#FFFFFF',
		borderColor: '#FFFFFF',
		borderWidth: 2,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: tabText
	}); 

	return self;
};

module.exports = ToolsTab;