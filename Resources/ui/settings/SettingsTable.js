function SettingsTable(_args) {
	var self = Ti.UI.createTableView({
		zIndex: 3,
  		right: 0,
  		borderRadius:10,
  		width:350,
  		backgroundColor: '#FFFFFF'
	});

	return self;
};

module.exports = SettingsTable;