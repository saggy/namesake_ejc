function ToolsView(_args) {
	var self = Ti.UI.createView({
		zIndex: 2,
  		top: 100,
  		right: 0,
  		borderRadius:10,
  		width:400,
  		height:700,
  		backgroundColor: '#FFFFFF'
	});
	VideoTable = require('ui/toolstabset/video/VideoTable'),
		videoTable = new VideoTable();
	
	return self;
};

module.exports = ToolsView;