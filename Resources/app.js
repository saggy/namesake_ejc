//includes
//Ti.include('data/fixedLists.js');
Ti.include('data/structs.js');
//Ti.include('book/Misc/namesake.js');
//Ti.include('data/dataSet.js');


//database
Titanium.Database.install('namesake.db', 'namesake');

//global Variables
var theTabGroup;  //this one might go away after you implement child tabs
var tablist = new Tablist();
var images  = new Images();
var themevalues  = new ThemeValues();

Ti.App.Properties.setString('fontSize', 0);

(function() {
		
   	//determine platform and form factor, not currently used for anything, this is an iPad only application
	var osname  = Ti.Platform.osname,
		version = Ti.Platform.version,
		height  = Ti.Platform.displayCaps.platformHeight,
		width   = Ti.Platform.displayCaps.platformWidth;
		
	var ApplicationTabGroup = require('ui/tabgroup/ApplicationTabGroup');
	theTabGroup = new ApplicationTabGroup();
	theTabGroup.open();
	
	//test code
	theTabGroup.setActiveTab(tablist.mainTab); 

})();

var styledLabel = require('ti.styledlabel');
var webView;
var pageAuthorView;
var bookDir;
var currentSearchTerm = '';
//events
Ti.App.addEventListener('gotoPage', function(e){
			var page = e.page;
				pageString = '';
		for(var i = webView.maxPages; i > 1; i /= 10){
			if(page<i){
				pageString = pageString + '0'; 				
			}
			else{
				break;
			}
		}
		
		pageString = bookDir + 'Page' + pageString + page + '.html';
		Ti.API.info(pageString);
		webView.setUrl(pageString);
		webView.page = page;
		pageAuthorView.fireEvent('page', {page: page});
	});


Ti.App.addEventListener('web:addSearchHighlight', function(e){
	if (currentSearchTerm.length > 0 ) {
		
		var searchTerm = currentSearchTerm;
		var n = searchTerm.split(' ');
		
		for (var i=0; i<n.length; i++) {
		Ti.App.fireEvent('app:addSearchHighlight', {searchWord: n[i]});
		}
		
		currentSearchTerm = '';	
	}

});

Ti.App.addEventListener('web:setFontSize', function(e){
//
var fontIndex = Ti.App.Properties.getString('fontSize');
var fontSize = settings[FONT_SIZE].data[fontIndex].value;
Ti.App.fireEvent('app:changeFontSizeWV', { fontSize : fontSize});

});

Ti.App.addEventListener('link_click', function(e) {
    var whereto = e._where;
    Ti.Platform.openURL(whereto);
});

