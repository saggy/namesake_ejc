function SearchTableSection(_args){
	var _parent = _args.parent;
	var header = _args.section, type = _args.type;
	var results = _args.results;
	var searchTerm  = _args.searchTerm;

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
			//console.log('Book '+ result.pageNo +' ' + result.bookText);
				row = new SearchTableRow({type: type, pageNo: result.pageNo, bookText: result.bookText, searchTerm: searchTerm});
				break;
			case 'bible':
			//console.log('Bible '+result.verse+ ' '+ result.verseText);
				row = new SearchTableRow({type: type, verse: result.verse, verseText: result.verseText, searchTerm: searchTerm });
				break;
			case 'answer':
			//console.log('Bible '+result.verse+ ' '+ result.verseText);
				row = new SearchTableRow({type: type, pageNo: result.pageNo, bookText: result.bookText, searchTerm: searchTerm});
				break;
			case 'store':
			//console.log('Store '+result.storeTitle, result.imageLoc);
				row = new SearchTableRow({type: type, storeTitle: result.storeTitle, imageLoc: result.imageLoc, searchTerm: searchTerm});
				break;
		}
		row.addEventListener('hideTools', function(e){
			_parent.hide();
		});
		
		self.add(row);
		//tableData.push(row);
	}
	//self.setData(tableData);
	
	return self;
}

module.exports = SearchTableSection;