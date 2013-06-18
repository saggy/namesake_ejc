function DefaultNoteView(){

	var self = Ti.UI.createImageView({
		bottom: 0,
  		image:'/images/backgrounds/defaultNote.png'
		});
	
	return self;
}

module.exports = DefaultNoteView;