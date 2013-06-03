function SearchTable(_searchBar) {
	var searchBar = _searchBar

	var self = Ti.UI.createTableView({
		zIndex: 3,
  		top: 100,
  		right: 0,
  		borderRadius:0,
  		width:400,
  		backgroundColor: '#FFFFFF'
	});


	return self;
};

module.exports = SearchTable;