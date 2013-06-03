function SearchTable(_args) {
	var _parent = _args.parent;
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
					'SELECT * FROM BS1 WHERE verseText MATCH ? LIMIT ?']
	
	var tableSections = [];
	var SearchTableSection = require('ui/toolstabset/search/SearchTableSection');
	searchBar.addEventListener('return',function(e){

		
		var searchTerm = searchBar.getValue();
		
		function formatText(text){
			var textArr = text.split(' ');
			var tempArr = [];
			for(var i = 0, len = textArr.length; i < len; i++ ){
				var temp = textArr.shift();
				tempArr.push(temp);
				if(temp.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
					textArr.unshift(tempArr.pop().toUpperCase());
					var j = 0;
					while(j < 3 && j < tempArr.length){
						textArr.unshift(tempArr.pop());
						j++;
					}
					break;
				}
			}
			return textArr.join(' ');
			
		}
		
		
		var db = Ti.Database.open('namesake');
	
		for(var i = 0, len = sections.length; i < len; i++){
			var type = types[i];
			var results = [];
			switch(type){
				case 'book':
					var rs = db.execute(queries[i], searchTerm, searchLimit);
					while(rs.isValidRow()){
						var text = formatText(rs.fieldByName('content'));
						var result = {type: type, pageNo: rs.fieldByName('page_no'), bookText: text };
						results.push(result);
						rs.next();
					}
					rs.close();
					break;
				case 'bible':
					var rs = db.execute(queries[i], searchTerm, searchLimit);
					while(rs.isValidRow()){
						var text = formatText(rs.fieldByName('verseText'));
						var result = {type: type, verse: rs.fieldByName('verse'), verseText: text };
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
			
			
			tableSections[i] = new SearchTableSection({section: sections[i], type: types[i], results: results, searchTerm: searchTerm, parent: _parent});
		}
		db.close();
		self.setData(tableSections);

		self.fireEvent('search');
	});
	self.setData(tableSections);
	return self;
};

module.exports = SearchTable;