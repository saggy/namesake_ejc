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
	
	var SearchBar = require('ui/toolstabset/search/searchBar'),
		searchBar = new SearchBar({parent: self});
		
	searchBar.addEventListener('return',function(e){
		searchTable.show();
		var searchLimit = 5;
		var sections = ['Namesake', 'Bible', 'More Titles'];
		var types = ['book', 'bible', 'store']
		var queries = ['SELECT * FROM bookSearch WHERE content MATCH ? LIMIT ?', 
					'SELECT * FROM BS1 WHERE verseText MATCH ? LIMIT ?']
	
		var tableSections = [];
		var SearchTableSection = require('ui/toolstabset/search/SearchTableSection');
	
		var searchTerm = searchBar.getValue();
		
		function formatText(text){
			var textArr = text.split(' ');
			var tempArr = [];
			for(var i = 0, len = textArr.length; i < len; i++ ){
				var temp = textArr.shift();
				tempArr.push(temp);
				if(temp.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
					textArr.unshift(tempArr.pop().toUpperCase());
					var j = 0;
					while(j < 3 && j < tempArr.length){
						textArr.unshift(tempArr.pop());
						j++;
					}
					break;
				}
			}
			return textArr.join(' ');
			
		}
		
		
		var db = Ti.Database.open('namesake');
	
		for(var i = 0, len = sections.length; i < len; i++){
			var type = types[i];
			var results = [];
			switch(type){
				case 'book':
					var rs = db.execute(queries[i], searchTerm, searchLimit);
					while(rs.isValidRow()){
						var text = formatText(rs.fieldByName('content'));
		console.log(text);
						var result = {type: type, pageNo: rs.fieldByName('page_no'), bookText: text };
						results.push(result);
						rs.next();
					}
					rs.close();
					break;
				case 'bible':
					var rs = db.execute(queries[i], searchTerm, searchLimit);
					while(rs.isValidRow()){
						var text = formatText(rs.fieldByName('verseText'));
		console.log(text);
						var result = {type: type, verse: rs.fieldByName('verse'), verseText: text  };
						results.push(result);
						rs.next();
					}
					rs.close();
					break;
				case 'store':
					var result = {type: type, storeTitle: 'Deep Blue Kids Bible', imageLoc: '/images/buttons/dbkb-ipad.png'};
					results.push(result);
					break;
			}
			
			
			tableSections[i] = new SearchTableSection({section: sections[i], type: types[i], results: results, parent: self});
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
	videoTable.hide()
	
	
	var ToolsTable = require('ui/toolstabset/ToolsTable'),
		toolsTable;
		
	var toolsH = 0;
	var tools = ['video','note','bookmark','highlight']
	var emptyView = Titanium.UI.createView({});
	
	var current = videoTable;
	
	
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
			//bookmarks
			case 2:
			//highlights
			case 3:
				self.rightNavButton = edit;
				toolsTable = new ToolsTable({type: tools[idx], parent: self});
				toolsTable.addEventListener('resize',function(e){
					toolsH = 50*(2+toolsTable.rowCount);
					toolsH = 400;
					self.setHeight(toolsH);
				});
				
				self.add(toolsTable);
				current = toolsTable;
				toolsH = 50*(2+toolsTable.rowCount);
				toolsH = 400;
				self.setHeight(toolsH);
				toolsTable.show();
				break;
			//search
			case 4:
				current = searchTable;
				searchTable.show();
				self.setHeight(400);
				self.rightNavButton = emptyView;
				searchTable.addEventListener('search', function(e){
					self.fireEvent('update');
					//tBar.index = 4;
					//tBar.fireEvent('click');
				});
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