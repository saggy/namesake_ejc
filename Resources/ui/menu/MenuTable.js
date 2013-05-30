function MenuTable(_args) {
	var self = Ti.UI.createTableView({
		zIndex: 3,
  		top: 100,
  		right: 0,
  		borderRadius:10,
  		width:300,
  		backgroundColor: '#FFFFFF'
	});

	return self;
};

module.exports = MenuTable;