function WebView(_args) {
	var bookDir = 'book/Text/';
	var cPage = _args.page;
	
	// code for popupmenu options
	var NOTE = '0', BOOKMARK = '1', HIGHLIGHT = '2';
	var self = Ti.UI.createWebView({
		top : 0,
		url : bookDir+'Page0001.xhtml',
		page: 1,
		maxPages: 1000, //power of 10
		scalesPageToFit:true,
    	contentWidth:'auto',
    	contentHeight:'auto',
    	willHandleTouches: false,
    	popupMenu: ["Note", "Bookmark", "Highlight"]
	}); 
	
	self.goToPage = function(page){
		pageString = '';
		for(var i = self.maxPages; i > 1; i /= 10){
			if(page<i){
				pageString = pageString + '0'; 				
			}
			else{
				break;
			}
		}
		
		pageString = bookDir + 'Page' + pageString + page + '.xhtml';
		self.setUrl(pageString);
		self.page = page;

	}

	self.getPage = function(){
		return self.page;
	}

	self.addEventListener('swipe', function(e){
		if(e.direction == 'left' && self.page < self.maxPages){
			self.goToPage(self.page+1);
		}
		else if(e.direction == 'right' && self.page > 1){
			self.goToPage(self.page-1);
		}
	});
	
	self.addEventListener('load', function(e){
		var db = Ti.Database.open('namesake');
		var page = self.getUrl().split('/').splice(-3).join('/');
		//var db = Ti.Database.open(dbName);
		//db.execute('DROP TABLE answer');
		//db.execute('DROP TABLE annotation');
		//db.execute('CREATE TABLE IF NOT EXISTS annotation (annotation_id INTEGER PRIMARY KEY, note_text TEXT, note_html TEXT, ' +
				//	 'note_offset NUMERIC, note_parent_id TEXT, row_index INTEGER, page TEXT, page_no INTEGER, start_id NUMERIC, end_id NUMERIC, type TEXT, note TEXT, highlight_color TEXT, create_date TEXT, modify_date TEXT)');
		//db.execute('CREATE TABLE IF NOT EXISTS answer (answer_id INTEGER PRIMARY KEY, answer_elementid TEXT, answer_text TEXT, page TEXT, page_no INTEGER, type TEXT, create_date TEXT, modify_date TEXT)');
		
		var rs = db.execute('SELECT answer_elementid, answer_text FROM answer WHERE page=?',page);
		
		
		while(rs.isValidRow()){
			var a = { text: rs.fieldByName('answer_text'), elementId: rs.fieldByName('answer_elementid')};

			Ti.App.fireEvent('app:answerquestion',a);
			rs.next();
		}
		rs.close();

		rs = db.execute('SELECT annotation_id, type, start_id, end_id, note, note_html, note_text, highlight_color FROM annotation WHERE page=?',page);
		while(rs.isValidRow()){
			var a = {id: rs.fieldByName('annotation_id'), type: rs.fieldByName('type'), startId : rs.fieldByName('start_id'), endId : rs.fieldByName('end_id'),
						noteText : rs.fieldByName('note_text'), noteHtml : rs.fieldByName('note_html'), note: rs.fieldByName('note'), highlightColor : rs.fieldByName('highlight_color') };

			switch(a.type){
				case 'note':
console.log(a.note);
					Ti.App.fireEvent('app:addNote',a);
					break;
				case 'bookmark':
					Ti.App.fireEvent('app:addBookmark',a);
					break;
				case 'highlight':
					Ti.App.fireEvent('app:addHighlight', a);
					break;
			}
			rs.next();
		}
		rs.close();
		db.close();

	});
	function parseIds(html){
		var id = {};
		var els = html.split('<span id=');
					
		var first = 1;
		var last = els.length -1;
		
		function getId(elem){
			var s = '';
			for(var i = 1, len = elem.length ; i < len; i++){
		
				if(elem.charAt(i) !== '"'){
					s = s.concat(elem.charAt(i));
				}
				else{
					return s;
				}
			}
		}
		
		id.first = getId(els[first]);
		id.last = getId(els[last]);
		return id;
	}

	self.addEventListener('selection', function(e) {
		var annotation = {};
		var ids = parseIds(e.html);
		
		annotation.id = null;
		annotation.noteText = e.text;
		annotation.noteHtml = e.html;
		annotation.startId = ids.first;
		annotation.endId = ids.last;
		annotation.page = self.getUrl().split('/').slice(-3).join('/');
		annotation.pageNo = self.getPage();
		annotation.created = +new Date();
		annotation.modified = annotation.created;
		annotation.note = null;
		annotation.highlightColor = null;
	
		switch(e.index){
			case NOTE:
				annotation.aType = 'note';
				Ti.App.fireEvent('app:addNote', annotation);
				
				break;
			case BOOKMARK:
				annotation.aType = 'bookmark';
				Ti.App.fireEvent('saveannotation', annotation);
				Ti.App.fireEvent('app:addBookmark', annotation);
				break;
			case HIGHLIGHT:
				annotation.aType = 'highlight';
				annotation.highlightColor = '#FFFF00';
				Ti.App.fireEvent('saveannotation', annotation);
				//Ti.App.fireEvent('app:addHighlight', annotation);
				self.reload();
				break;
		}
	Ti.API.info(annotation.noteText);
		Ti.API.info(annotation.noteHtml);
		Ti.API.info(annotation.type);
		Ti.API.info(annotation.startId);
		Ti.API.info(annotation.endId);
		Ti.API.info(annotation.note);
		Ti.API.info(annotation.page);
		Ti.API.info(annotation.pageNo);
	
		//alert(JSON.stringify(e));
	});
	self.goToPage(cPage);
	return self;
}

module.exports = WebView;