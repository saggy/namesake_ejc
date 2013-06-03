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
	/*
	var ToolsTab = require('ui/toolstabset/ToolsTab');
	var toolsTabs = [];
	for(var i = 0; i < tools.length; i++){
		var tab = new ToolsTab(tools[i]);
		tab.setLeft(i*tab.width);
		toolsWindow.add(tab);
		toolsTabs.push(tab);
	}
*/
	var SearchTable = require('ui/toolstabset/search/SearchTable'),
		searchTable = new SearchTable({parent: self});
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
					tBar.index = 4;
					tBar.fireEvent('click');
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