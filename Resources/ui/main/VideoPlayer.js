function VideoPlayer(_args) {
	var url = _args.url;
	
	var self = Ti.UI.createView({
		height: 350,
		width: 450,
		backgroundColor: '#000000'
	});
	var CloseButton = require('ui/controls/CloseButton'),
		closeButton = new CloseButton();

	var videoPlayer = Ti.Media.createVideoPlayer({
			top: 50,
			url: url,
			mediaControlStyle: Ti.Media.VIDEO_CONTROL_EMBEDDED
		});
	
	closeButton.addEventListener('click', function(e){
		self.hide();
		videoPlayer.stop();
	})	
		
	self.add(closeButton);
	self.add(videoPlayer);
	return self;
}

module.exports = VideoPlayer;