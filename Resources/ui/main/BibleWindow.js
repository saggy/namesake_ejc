function BibleWindow(_args){

	var bibleDir = 'CEB/';
	Ti.include(bibleDir+'bible.js');

	var self = Ti.UI.createView({
			zIndex: 5,
            width:575, 
            height:600,
            right: -700,
            borderColor: '#0096DE'
            });
	
	var title = Ti.UI.createLabel({
		title:'',
		top: 0,
		height: 50,
		width: 575,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: '#FFFFFF',
		backgroundColor: '#0096DE'
	});
	var close = Ti.UI.createButton({
		title: 'Close',
		right: 0,
		top: 0,
		zIndex: 6
	});
	close.addEventListener('click', function(e){
		self.fireEvent('bibleclose');
	});

	
	var webView = Ti.UI.createWebView({
		scalesPageToFit: false,
		top: 50,
		contentWidth: 'auto',
		contentHeight: 'auto',
	});
	self.goToVerse = function(v){
		var book = v.book, chapter = v.chapter, verse = v.verse, searchTerm = v.searchTerm;
		
		var htmlFile;
		var longBookName;
		
		for(var i = 0; i < bible.length; i++){
			if(bible[i].shortName == book){
				htmlFile = bible[i].url;
				longBookName = bible[i].title;
			}
		}
		
		title.setText(longBookName + ' ' + chapter);
		var url = bibleDir + htmlFile + '?book=' + book + '&chapter=' + chapter + '&verse=' + verse;
		if(searchTerm != ''){
			url += '&search_term='+searchTerm.replace(' ','%20');
		}
		
		self.book = book;
		self.chapter = chapter;
		self.verse = verse;
		self.searchTerm = searchTerm;
		webView.setUrl(url);
		webView.reload();
	}
	webView.addEventListener('load', function(data) 
	{ 
     Ti.App.fireEvent('gotoVerse', {book: self.book, chapter: self.chapter, verse:self.verse});
     if(self.searchTerm != ''){
			Ti.App.fireEvent('highlightSearchTerm', {search_term: self.searchTerm.replace(' ','%20')});
		}
	});

	self.add(title);
	self.add(close);
	self.add(webView);
	return self;
}

module.exports = BibleWindow;