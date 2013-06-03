function SearchTable(_args) {
	var searchBar = Ti.UI.createSearchBar({
		barColor: '#000000',
		showCancel: true,
		height: 50,
		top: 0
	});
	var self = Ti.UI.createTableView({
		zIndex: 3,
  		top: 50,
  		right: 0,
  		borderRadius:0,
  		width:400,
  		backgroundColor: '#FFFFFF',
  		search: searchBar
	});
	var searchLimit = 5;
	var sections = ['Namesake', 'Bible', 'More Titles'];
	var types = ['book', 'bible', 'store']
	var queries = ['SELECT * FROM bookSearch WHERE content MATCH ? LIMIT ?', 
					'SELECT * FROM bibleSearch WHERE verseText LIKE "%?%" LIMIT ?']
	
	
	var SearchTableSection = require('ui/toolstabset/search/SearchTableSection'),
			tableSections = [];
	
	searchBar.addEventListener('return',function(e){
		var searchTerm = searchBar.getValue();
		
		var db = Ti.Database.open('namesake');
		
		for(var i = 0, len = sections.length; i < len; i++){
			var type = types[i];
			var results = [];
			switch(type){
				case 'book':
					var rs = db.execute(queries[i], searchTerm, searchLimit);
					while(rs.isValidRow()){
						var result = {type: type, pageNo: 15, bookText: rs.fieldByName('content') };
						results.push(result);
						rs.next();
					}
					rs.close();
					break;
				case 'bible':
					var rs = db.execute('SELECT * FROM bibleSearch WHERE verseText LIKE "%'+searchTerm+'%" LIMIT ?', searchLimit);
					while(rs.isValidRow()){
						var result = {type: type, verse: rs.fieldByName('verse'), verseText: rs.fieldByName('verseText') };
						results.push(result);
						rs.next();
					}
					rs.close();
					break;
				case 'store':
					var result = {type: type, storeTitle: 'Deep Blue Kids Bible', imageLoc: '/images/buttons/dbkb-ipad.png'};
					results.push(result);
					break;
			}
			
			
			tableSections[i] = new SearchTableSection({title: sections[i], type: types[i], results: results});
		}
		db.close();
		self.setData(tableSections);
	});
	self.setData(tableSections);
	return self;
};

module.exports = SearchTable;