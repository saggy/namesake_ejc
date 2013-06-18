function BibleWindow(_args){

	var bibleDir = 'CEB/';
	Ti.include(bibleDir+'bible.js');

	var self = Ti.UI.createView({
			zIndex: 5,
            width:575, 
            height:600,
            right: -700,
            borderColor: '#0096DE',
            borderRadius: 5
            });
            

	var ceb = Ti.UI.createLabel({
		text: 'Common English Bible',
		color: 'white'
	});
	
		var title = Ti.UI.createLabel({
		text: 'Genesis',
		color: 'white'
	});
	
	var close = Titanium.UI.createButton({
    title: 'Close',
    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});

	close.addEventListener('click', function(e){
		self.fireEvent('bibleclose');
	});
	
	var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var navBar =  Titanium.UI.iOS.createToolbar({ barColor:'#0096DE', 
	items:[title, flexSpace, ceb, flexSpace, close],
	top:0,
	zIndex: 1
	 });

	
	var webView = Ti.UI.createWebView({
		scalesPageToFit: false,
		contentWidth: 'auto',
		contentHeight: 'auto',
		top: 44,
		zIndex: 2
	});
	
		var bibleShow = Ti.UI.createAnimation({
		duration: 1000,
		right: 25
	});
	var bibleHide = Ti.UI.createAnimation({
		right: -700,
		duration: 1000
	})
	self.addEventListener('bibleclose', function(e){
		self.animate(bibleHide);
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
	self.animate(bibleShow);
	});
	

	self.add(navBar);
	self.add(webView);
	return self;
}

module.exports = BibleWindow;