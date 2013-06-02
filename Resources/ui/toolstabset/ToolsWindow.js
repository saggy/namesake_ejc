function ToolsWindow(_args){
	var self = Ti.UI.createView({
  		top: 0,
  		right: 15,
  		width:400,
  		height:750
	});
	
	var CloseButton = require('ui/controls/CloseButton'),
		closeButton = new CloseButton();
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
		searchTable = new SearchTable();
	self.add(searchTable);
	searchTable.hide();

	var VideoTable = require('ui/toolstabset/video/VideoTable'),
		videoTable = new VideoTable();
	var videoH = 50*(2+video.length);
	
	self.add(videoTable);
	videoTable.hide()
	
	
	var ToolsTable = require('ui/toolstabset/ToolsTable'),
		toolsTable;
		
	var toolsH = 0;
	var tools = ['video','note','bookmark','highlight']

	
	var current = videoTable;
	tBar.addEventListener('click',function(e){
		current.hide();
		var idx = tBar.getIndex();
		switch(idx){
			//video
			case 0:
				current = videoTable;
				videoTable.show();
				self.setHeight(videoH);
				break;
			//notes
			case 1:
			//bookmarks
			case 2:
			//highlights
			case 3:
				toolsTable = new ToolsTable({type: tools[idx]});
				toolsTable.addEventListener('resize',function(e){
					toolsH = 50*(3+toolsTable.rowCount);
					self.setHeight(toolsH);
				});
				
				self.add(toolsTable);
				current = toolsTable;
				toolsH = 50*(3+toolsTable.rowCount);
				self.setHeight(toolsH);
				toolsTable.show();
				break;
			//search
			case 4:
				current = searchTable;
				searchTable.show();
				self.setHeight(searchTable.getHeight());
				break;
		}
	});
	self.add(tBar);
	self.add(closeButton);
	
	closeButton.addEventListener('click', function(e){
		self.hide();
	});
	

	//self.add(videoButton);

	return self;
}

module.exports = ToolsWindow;