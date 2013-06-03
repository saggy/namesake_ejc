function ToolsView(_args) {
	var self = Ti.UI.createView({
		zIndex: 2,
  		top: 0,
  		right: 0,
  		width:400,
  		height:700,
  		backgroundColor: '#000000'
	});
	//VideoTable = require('ui/toolstabset/video/VideoTable'),
		//videoTable = new VideoTable();
	
	return self;
};

module.exports = ToolsView;