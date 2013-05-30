function BibleWindow(_args){
	var book = _args.book, chapter = _args.chapter, verse = _args.verse;
	
	var bibleDir = 'CEB/';
	Ti.include(bibleDir+'bible.js');
	
	var htmlFile;
	for(var i = 0; i < bible.length; i++){
		if(bible[i].shortName == book){
			htmlFile = bible[i].url;
		}
	}
	
	var url = bibleDir + htmlFile + '?' + 'book=' + book + '&' + 'chapter=' + chapter + '&' + 'verse=' + verse;
	
	var self = Ti.UI.createView({
		height: 650,
		width: 450,

	})
	
	var webView = Ti.UI.createWebView({
		top: 55,
		height: 595,
		width: 450,
		borderWidth: 5,
		borderColor: '#0096DE',
		scalesPageToFit: true,
		contentWidth: 'auto',
		contentHeight: 'auto',
		url : url,
	});
	
	var CloseButton = require('ui/controls/CloseButton'),
		closeButton = new CloseButton();
		
	closeButton.addEventListener('click', function(e){
		self.hide();
		Ti.App.fireEvent('closebible',e);
	})	
	self.add(closeButton);
	self.add(webView);
	return self;
}

module.exports = BibleWindow;