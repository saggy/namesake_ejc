function SettingsWindow(_args){
	var options = settings;

	
	var defaultH = options.length*50;
	var defaultTitle = 'Settings';
	
	var self = Ti.UI.iPad.createPopover({
        width:350, 
        height: defaultH,
        arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
        backgroundColor: 'black',
        title: defaultTitle
        });

	var emptyView = Titanium.UI.createView({});
	self.setRightNavButton(emptyView);
	
	var backButton = Titanium.UI.createImageView({height: 38, width: 44, top: 0, left:0, backgroundImage: 'images/buttons/backArrow.png'}); 

	var SettingsTable = require('ui/settings/SettingsTable'),
			settingsTable = new SettingsTable();
	var SettingsTableRow = require('ui/settings/SettingsTableRow');
	
	var tableData = [];
	for(var i = 0, len = options.length; i < len; i++){
		var row = new SettingsTableRow({index: i, title: options[i].title, children: true, label: true});
		row.addEventListener('click', function(e){
			self.leftNavButton = backButton;
			backButton.addEventListener('click', function(e){
				settingsTable.setData(tableData);
				self.setHeight(defaultH);
				self.setTitle(defaultTitle);
				self.leftNavButton = emptyView;
			});
			var i = this.rowIndex;
			var data = options[i].data;
			var title  = options[i].title;
			var tData = [];
			for(var j = 0, len2 = data.length; j < len2; j++){
				var row2;
				
				switch(title){
					case 'Highlight Color':
						row2 = new SettingsTableRow({index: j, title: data[j].title, backgroundColor: data[j].value, children: false});
						row2.addEventListener('click', function(e){
							self.fireEvent('changeHighlight', {index: this.rowIndex});
						});
						break;
					case 'Font Size':
						row2 = new SettingsTableRow({index: j, title: data[j].title, sizeFactor: data[j].value, children: false});
						row2.addEventListener('click', function(e){
							self.fireEvent('changeFontSize', {index: this.rowIndex});
						});
						break;
						break;
				}
				tData.push(row2);
			}
			self.setHeight(50*data.length);
			settingsTable.setData(tData);
			
		});
		
		tableData.push(row);
	}
	settingsTable.setData(tableData);
	
	self.settings = options;
	self.add(settingsTable);		

	return self;
}

module.exports = SettingsWindow;