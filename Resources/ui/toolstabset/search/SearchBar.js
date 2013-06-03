function SearchBar(_args) {
	var self = Ti.UI.createSearchBar({
		barColor: '#000000',
		showCancel: true,
		height: 50,
		top: 50
	});
	

	return self;
};

module.exports = SearchBar;