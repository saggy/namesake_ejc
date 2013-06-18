function ToolsWindow(_args){

		var self = Ti.UI.iPad.createPopover({
            width:400, 
            height: 600,
            arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
            		backgroundColor: 'black',
            title: 'Tools'
            });
	
	var ToolsView = require('ui/toolstabset/ToolsView'),
		toolsView = new ToolsView();

	var tools = ['Video','Notes','Bookmarks','Highlights','Search'];
	var ToolsBar = require('ui/toolstabset/ToolsBar'),
		tBar = new ToolsBar({items: tools});
	
	var SearchBar = require('ui/toolstabset/search/SearchBar'),
		searchBar = new SearchBar({parent: self});
		
	searchBar.addEventListener('return',function(e){
		searchTable.show();
		var searchLimit = 15;
		var sections = ['Namesake', 'Notes', 'Bible'];
		var types = ['book', 'answer', 'bible']; //More titles is gone because it's not complete for this sprint.
		var queries = [	'SELECT * FROM bookSearch WHERE content MATCH ? LIMIT ?', 
						'SELECT * FROM ANNOTATION WHERE type = \'note\' AND NOTE LIKE ? LIMIT ?',
						'SELECT * FROM BS1 WHERE verseText MATCH ? LIMIT ?']
	
		var tableSections = [];
		var SearchTableSection = require('ui/toolstabset/search/SearchTableSection');
	
		var searchTerm = searchBar.getValue();
		
		function formatText(text){
			if(text.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1){
console.log('error');
				return false;
			}
			var textArr = text.split(' ');
			var searchArr = searchTerm.split(' ');
			var tempArr = [];
			for(var i = 0, len = textArr.length; i < len; i++ ){
				var temp = textArr.shift();
				tempArr.push(temp);
				if(temp.toLowerCase().indexOf(searchArr[0].toLowerCase()) !== -1){
	//console.log(searchArr.length);
					if(searchArr.length == 1){
						textArr.unshift('<b>' + tempArr.pop() + '</b>'); //here
						
						textArr = tempArr.slice(-3).concat(textArr);

						break;
					}
					else{
						var tempArr2 = [];
						temp = tempArr.pop();
						textArr.unshift(temp);
						var match = false;
						for(var j = 0, len2 = searchArr.length; j < len2; j++){
							i++;
							var temp2 = textArr.shift();
							tempArr2.push('<b>'+temp2+'</b>');
							if(searchArr[j].indexOf(temp2) !== -1){
								match = true;
							}
							else{
								match = false;
								while(j >= 0){
									tempArr.push(tempArr2.shift());
									j--;
								}
								break;
							}
						}
						
						if(tempArr2.length == searchArr.length && match){
							tempArr2 = tempArr.slice(-2).concat(tempArr2);
							textArr = tempArr2.concat(textArr);
							
				console.log(textArr.join(' '));
							break;
						}
					}
				}
			}
			return textArr.join(' ');
		}
		
		function trim(text){
			return text.replace(/^\s+|\s+$/g,'');
		}
		
		var db = Ti.Database.open('namesake');
	
		for(var i = 0, len = sections.length; i < len; i++){
			var type = types[i];
			var results = [];
			switch(type){
				case 'book':
					searchTerm = trim(searchTerm);
					var rs = db.execute(queries[i], searchTerm, searchLimit);
					while(rs.isValidRow()){
				//console.log(rs.fieldByName('content'));
						var text = formatText(rs.fieldByName('content'));
		//console.log(text);
		//Ti.API.log('page_no: ' + rs.fieldByName('page_no') +', content: ' + rs.fieldByName('content'));
						if(text){
							var result = {type: type, pageNo: rs.fieldByName('page_no'), bookText: text };
							results.push(result);
						}
						rs.next();
					}
					rs.close();
					break;
				case 'bible':
					searchTerm = trim(searchTerm);
					var rs = db.execute(queries[i], searchTerm, searchLimit);
					while(rs.isValidRow()){
						
						var text = formatText(rs.fieldByName('verseText'));
		//console.log(text);
						if(text){
							var result = {type: type, verse: rs.fieldByName('verse'), verseText: text  };
							results.push(result);
						}
						rs.next();
					}
					rs.close();
					break;
				case 'answer':
					searchTerm = trim(searchTerm);
					var rs = db.execute(queries[i], '%' + searchTerm +'%', searchLimit);
					while(rs.isValidRow()){
				//console.log(rs.fieldByName('content'));
						var text = formatText(rs.fieldByName('note'));
						
		//console.log(text);
		//Ti.API.log('page_no: ' + rs.fieldByName('page_no') +', content: ' + rs.fieldByName('content'));
						if(text){
							var result = {type: type, pageNo: rs.fieldByName('page_no'), bookText: text };
							results.push(result);
						}
						rs.next();
					}
					rs.close();
					break;
			}
			
			
			tableSections[i] = new SearchTableSection({section: sections[i], type: types[i], results: results, searchTerm: searchTerm, parent: self});
		}
		db.close();
		searchTable.setData(tableSections);
	});
	
	
	
	
	
	
		
	var SearchTable = require('ui/toolstabset/search/SearchTable'),
		searchTable = new SearchTable(searchBar);
		
	self.add(searchBar);
	self.add(searchTable);
	searchTable.hide();

	var VideoTable = require('ui/toolstabset/video/VideoTable'),
		videoTable = new VideoTable(self);
	var videoH = 50*(1+video.length);
	
	self.add(videoTable);
	videoTable.hide();
	
	
	var ToolsTable = require('ui/toolstabset/ToolsTable'),
		toolsTable;
		
	var toolsH = 0;
	var tools = ['video','note','bookmark','highlight']
	var emptyView = Titanium.UI.createView({});
	
	var current = videoTable;
	
		var DefaultNote = require('ui/toolstabset/DefaultNoteView'),
		defaultNote = new DefaultNote();
		
		self.add(defaultNote);
		defaultNote.hide();
	
	var DefaultBookmark = require('ui/toolstabset/DefaultBookmarkView'),
		defaultBookmark = new DefaultBookmark();
		
		self.add(defaultBookmark);
		defaultBookmark.hide();
		
	var DefaultHighlight = require('ui/toolstabset/DefaultHighlightView'),
		defaultHighlight = new DefaultHighlight();
		
		self.add(defaultHighlight);
		defaultHighlight.hide();
	
	
	
		var edit = Ti.UI.createButton({
		title: 'Edit'
	    });
	edit.addEventListener('click',function(e){
		//table.moving = true;
		//table.editing = true;
		toolsTable.fireEvent('editClick');
		self.rightNavButton = done;
	});
	
	var done = Ti.UI.createButton({
		title: 'Done',
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	done.addEventListener('click', function(e){
		//table.moving = false;
		//table.editing = false;
		toolsTable.fireEvent('doneClick');
		self.rightNavButton = edit;
		webView.reload();
	});
	
	self.addEventListener('refreshTable', function(e) {	
	tBar.fireEvent('click', {});
	webView.reload();	
	});
	
	
	tBar.addEventListener('click',function(e){
		current.hide();
		var idx = tBar.getIndex();
		switch(idx){
			//video
			case 0:
				current = videoTable;
				videoTable.show();
				self.setHeight(videoH);
				self.rightNavButton = emptyView;
				break;
			//notes
			case 1:
				self.rightNavButton = edit;
				toolsTable = new ToolsTable({type: tools[idx], parent: self});
				if (toolsTable.rowCount > 0) {
				current = toolsTable;
				self.add(toolsTable);
				toolsTable.show();	
				}
				else {
				current = defaultNote;
				defaultNote.show();
				}
				break;
			//bookmarks
			case 2:
				self.rightNavButton = edit;
				toolsTable = new ToolsTable({type: tools[idx], parent: self});
				if (toolsTable.rowCount > 0) {
				current = toolsTable;
				self.add(toolsTable);
				toolsTable.show();	
				}
				else {
				current = defaultBookmark;
				defaultBookmark.show();
				}
				break;
			//highlights
			case 3:
				self.rightNavButton = edit;
				toolsTable = new ToolsTable({type: tools[idx], parent: self});
				if (toolsTable.rowCount > 0) {
				current = toolsTable;
				self.add(toolsTable);
				toolsTable.show();	
				}
				else {
				current = defaultHighlight;
				defaultHighlight.show();	
				}
				break;
			//search
			case 4:
				current = searchTable;
				searchTable.show();
				///searchBar.show();
				self.setHeight(400);
				self.rightNavButton = emptyView;
				break;
			//default because I fire a click event with no index when the toolbar is first created - and I want that to load the video list, rather than have nothing loaded.
			default:
				current = videoTable;
				videoTable.show();
				self.setHeight(videoH);
				self.rightNavButton = emptyView;
				break;
		}
	});
	self.add(tBar);
	
	tBar.fireEvent('click');

	//self.add(videoButton);

	return self;
}

module.exports = ToolsWindow;