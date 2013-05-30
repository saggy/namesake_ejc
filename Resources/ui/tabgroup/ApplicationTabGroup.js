function ApplicationTabGroup() {
	//create module instance
	var self = Ti.UI.createTabGroup(),
		mainWindow   = require('ui/main/mainWindow');
			
	var mainWin   = new mainWindow();

	var tab1 = Ti.UI.createTab({
		title: '',
		window: mainWin
	});
	
	mainWin.containingTab = tab1;
	mainWin.tabGroup = self;	
	
	self.addTab(tab1);
	self.setActiveTab(0);
    self.model = Ti.Platform.model;
	
	return self;
};

module.exports = ApplicationTabGroup;