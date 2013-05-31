function BibleWindow(_args){
	var book = _args.book, chapter = _args.chapter, verse = _args.verse;
	
	var bibleDir = 'CEB/';
	Ti.include(bibleDir+'bible.js');
	
	var htmlFile;
	var longBookName;
	
	for(var i = 0; i < bible.length; i++){
		if(bible[i].shortName == book){
			htmlFile = bible[i].url;
			longBookName = bible[i].title;
		}
	}
	
	var url = bibleDir + htmlFile + '?' + 'book=' + book + '&' + 'chapter=' + chapter + '&' + 'verse=' + verse;
	
	var self = Ti.UI.iPad.createPopover({
            width:500, 
            height:600,
            arrowDirection: false,
            title: longBookName + ' ' + _args.chapter,
            borderColor: '#0096DE'
            });
	
	var webView = Ti.UI.createWebView({
		scalesPageToFit: false,
		contentWidth: 'auto',
		contentHeight: 'auto',
		url : url
	});
	

	self.add(webView);
	return self;
}

module.exports = BibleWindow;