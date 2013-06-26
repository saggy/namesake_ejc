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
	var dbName = 'namesake';
	Ti.App.Properties.setInt('highlightColor', 1);
	var highlightColor = (!Ti.App.Properties.hasProperty('highlightColor')) ? DEFAULT_HIGHLIGHT_COLOR : Ti.App.Properties.getInt('highlightColor'); 
	

//events
Ti.App.addEventListener('gotoPage', function(e){
	Ti.App.fireEvent('app:unload', {});
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


Ti.App.addEventListener('saveannotation',function(a){
	    var highlightColor = (!Ti.App.Properties.hasProperty('highlightColor')) ? DEFAULT_HIGHLIGHT_COLOR : Ti.App.Properties.getInt('highlightColor'); 
		var db = Ti.Database.open(dbName);
		Ti.API.info('saveannotation;  page: ' + a.page +', type: ' + a.aType + ', anchorNodeId: ' + a.anchorNodeId + ', anchorOffset: ' + a.anchorOffset + ', anchorNodeType: ' + a.anchorNodeType);

		a.rowIndex = db.execute('SELECT COUNT(*) FROM annotation WHERE type=?', a.aType).field(0, Ti.Database.FIELD_TYPE_INT);
		
		var query = 'INSERT INTO annotation (note_text, note_html, page, page_no, start_id, end_id, type, note, row_index, highlight_color, create_date, modify_date, anchor_node_id, anchor_offset, focus_node_id, focus_offset, anchor_node_type, focus_node_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		var editQuery = 'UPDATE annotation SET note=?, modify_date=? WHERE annotation_id=?';
		if(a.id == null){
			db.execute(query, a.noteText, a.noteHtml, a.page, a.pageNo, a.startId, a.endId, a.aType, a.note, a.rowIndex, highlightColor, a.created, a.modified, a.anchorNodeId, a.anchorOffset, a.focusNodeId, a.focusOffset, a.anchorNodeType, a.focusNodeType);
		}
		else{
			db.execute(editQuery, a.note, a.modified, a.id);
		}
		db.close();	
		if(a.aType == 'note'){
			webView.reload();
		}
	});
	
Ti.App.addEventListener('web:addHighlights',function(b){

	var db = Ti.Database.open('namesake');
		var page = b.url.split('/').splice(-3).join('/');

		rs = db.execute('SELECT annotation_id, type, start_id, end_id, note, note_html, note_text, highlight_color, anchor_node_id, anchor_offset, focus_node_id, focus_offset, anchor_node_type, focus_node_type FROM annotation WHERE page=? and type=?',page, 'highlight');
		while(rs.isValidRow()){
console.log(settings[HIGHLIGHT_COLOR].data[rs.fieldByName('highlight_color')].value );
			var highlightColor = settings[HIGHLIGHT_COLOR].data[rs.fieldByName('highlight_color')].value;
			var a = {id: rs.fieldByName('annotation_id'), type: rs.fieldByName('type'), startId : rs.fieldByName('start_id'), endId : rs.fieldByName('end_id'),
						noteText : rs.fieldByName('note_text'), noteHtml : rs.fieldByName('note_html'), note: rs.fieldByName('note'), 
						highlightColor : highlightColor, hcIndex : rs.fieldByName('highlight_color')
						, anchorNodeId: rs.fieldByName('anchor_node_id')
						, anchorOffset: rs.fieldByName('anchor_offset')
						, focusNodeId: rs.fieldByName('focus_node_id')
						, focusOffset: rs.fieldByName('focus_offset')
						, anchorNodeType: rs.fieldByName('anchor_node_type')
						, focusNodeType: rs.fieldByName('focus_node_type')};
 
 			
			Ti.API.info('web:addHighlights;  url: ' + b.url +', type: ' + a.aType + ', anchorNodeId: ' + a.anchorNodeId + ', anchorNodeOffset: ' + a.anchorNodeOffset);
			Ti.App.fireEvent('app:addHighlight', a);

			rs.next();
		}
		rs.close();
		db.close();
	
});

Ti.App.addEventListener('web:info',function(a){

Ti.API.info(a.info);
	
});


/* used to load text index on a one time basis
Ti.App.addEventListener('web:savePageToBookSearch',function(a){

	var db = Ti.Database.open('namesake');
	
	var page = a.url.split('/').splice(-3).join('/');
	var page_no = webView.page;
	var content=a.content;
	
	var query = 'INSERT INTO bookSearch (page, page_no, content) VALUES (?,?,?)';
	db.execute(query, page, page_no, content);
	db.close()
	
});


Ti.App.addEventListener('web:resetBookSearch',function(a){

	var db = Ti.Database.open('namesake');
	
	
	var query = 'DELETE from bookSearch;';
	db.execute(query);
	db.close()
	
});
*/

