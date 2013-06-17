function VideoPlayer(_args) {
	var url = _args.url;
	
	
	var self = Ti.UI.createWindow({
		barColor: '#0096DE',
		title: 'Video'
	});
	
	/*
	var self = Ti.UI.createView({
		height: 350,
		width: 450,
		backgroundColor: '#000000'
	});
	*/


	var videoPlayer = Ti.Media.createVideoPlayer({
			url: url,
			mediaControlStyle: Ti.Media.VIDEO_CONTROL_EMBEDDED
		});
		
			var closeButton = Ti.UI.createButton({
		title: 'Done',
		style: Ti.UI.iPhone.SystemButtonStyle.Done
	});
	
	closeButton.addEventListener('click', function(e){
		videoPlayer.stop();
		self.close();
	})	
		
	self.setRightNavButton(closeButton);
	self.add(videoPlayer);
	return self;
}

module.exports = VideoPlayer;