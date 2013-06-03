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

<<<<<<< HEAD
=======
		
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
>>>>>>> 10f98ef60c32be527191ea4bf2540c127a52d4e1
	return self;
};

module.exports = SearchTable;