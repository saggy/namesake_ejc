function aboutWindow(_args) {
	var self = Ti.UI.createWindow({
		title:'About',
		tabBarHidden: true,
		barColor: themevalues.themeColor,
		backgroundImage: images.aboutBkPortrait,
		backButtonTitle: ' Back '
	});
	
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;

	if (pWidth > pHeight) {  //events don't help with initial, so must set here
    	var oriCurrent = 'landscape';
	} else {
    	var oriCurrent = 'portrait';    
	}

	  if (oriCurrent == 'landscape' ){
			self.backgroundImage = images.aboutBkLandscape;
		}
		

    Ti.App.addEventListener('orient', function (e) {
    		if(e.portrait===true) {
			self.backgroundImage = images.aboutBkPortrait;
	
		} else if (e.landscape===true  ){
			self.backgroundImage = images.aboutBkLandscape;
			
		} else {
			//do nothing
		}
	});
	
	var centerArea = require('ui/info/centerArea'),
		center = new centerArea();
	self.add(center);
		
	return self;
};

module.exports = aboutWindow;