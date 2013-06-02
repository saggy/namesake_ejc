function SearchTableSection(_args){
	var header = _args.title, type = _args.type;
	var results = _args.results;
	
	var self = Ti.UI.createTableViewSection({
		headerTitle: header
	});
	
	var SearchTableRow = require('ui/toolstabset/search/SearchTableRow');
	var tableData = [];

	for(var i = 0; i < results.length; i++){
		var row;
		var result = results[i];
		switch(type){
			case 'book':
				row = new SearchTableRow({pageNo: result.pageNo, bookText: result.bookText});
				break;
			case 'bible':
				row = new SearchTableRow({verse: result.verse, verseText: result.verseText});
				break;
			case 'store':
				row = new SearchTableRow({storeTitle: result.storeTitle, imageLoc: result.imageLoc});
				break;
		}


		tableData.push(row);
	}
	self.setData(tableData);
	
	return self;
}

module.exports = SearchTableSection;