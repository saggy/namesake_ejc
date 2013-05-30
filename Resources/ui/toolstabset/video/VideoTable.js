function VideoTable(_args) {
	Ti.include('videos/video.js');
	var videoDir = 'videos/';
	
	var self = Ti.UI.createTableView({
		zIndex: 3,
  		top: 100,
  		right: 0,
  		borderRadius:10,
  		width:400,
  		backgroundColor: '#FFFFFF'
	});
	
	var VideoTableRow = require('ui/toolstabset/video/VideoTableRow');
	var videoTableData = [];

	for(var i = 0; i < video.length; i++){
		row = new VideoTableRow({index: i, title: video[i].title, imageLoc: videoDir+video[i].poster});
		row.addEventListener('click', function(e){
			Ti.App.fireEvent('playvideo',{video: video[this.rowIndex].video})
			//play video at videoDir+video[i].video
		});
		videoTableData.push(row);
	}
	self.setData(videoTableData);
	return self;
};

module.exports = VideoTable;