function SettingsWindow(_args){
	var options = [
	{ title: 'Font Size',
		data:[
			{ title : 'Small',
				value : .75 },
			{ title: 'Regular',
				value : 1 },
			{ title: 'Large',
				value : 1.5 }
			]
	}, 
	{
		title: 'Highlight Color',
		data : [
			{ title: 'Green',
				value: '#22FF08'},
			{ title: 'Yellow',
				value: '#FFEF1D'},
			{ title: 'Blue',
				value: '#2AEEFE'},
			{ title: 'Red',
				value: '#FC8A96'}
		]
	}];

	
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
	self.setRightNaveButton(emptyView);
	
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
						row2 = new SettingsTableRow({index: j, backgroundColor: data[j].value, children: false});
						self.setHeight(50*len2);
						break;
					case 'Font Size':
					console.log(data[j].value);
						row2 = new SettingsTableRow({index: j, title: data[j].title, children: false});
						self.setHeight(50*len2);
						break;
				}
				tData.push(row2);
			}
			
			settingsTable.setData(tData);
			
		});
		
		tableData.push(row);
	}
	settingsTable.setData(tableData);
	
	
	self.add(settingsTable);		

	return self;
}

module.exports = SettingsWindow;