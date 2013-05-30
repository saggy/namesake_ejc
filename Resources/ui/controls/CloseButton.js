function CloseButton(_args) {
	var self = Ti.UI.createImageView({zIndex: 2, height: 50, width: 50, top: 0, right:0, backgroundImage: 'images/buttons/glassClose.png'}); 

	return self;
};

module.exports = CloseButton;