function MenuWindow(_args){
	var webView = _args.webView;
	
	Ti.include('book/book.js');
	var self = Ti.UI.createView({
  		top: 0,
  		left: 15,
  		width:300,
  		height:750
	});
	
	var CloseButton = require('ui/controls/CloseButton'),
		closeButton = new CloseButton();

	self.add(closeButton);
	
	closeButton.addEventListener('click', function(e){
		self.hide();
	});
	
	
	var MenuTitle = require('ui/menu/MenuTitle'),
		menuTitle = new MenuTitle({title: 'Content'});
		

	var toc = book[0]['toc'];
	var defaultH = 50*(toc.length+2);
	self.setHeight(defaultH);
	
	
	var MenuTable = require('ui/menu/MenuTable'),
		menuTable = new MenuTable();
	var MenuTableRow = require('ui/menu/MenuTableRow');
	var MenuButton = require('ui/main/navbar/menubutton/MenuButton');
	

	var tableData = [];
	var backButton = new MenuButton();

	backButton.setTop(50);
	backButton.setZIndex(5);
	self.add(backButton);
	backButton.hide();

	self.add(menuTitle);
	

	for(var i = 0; i < toc.length; i++){
		var changePage = function(page){
			webView.goToPage(page);
		}
		var title = (typeof toc[i]['subtitle'] === 'undefined') ? toc[i]['chapter'] : toc[i]['chapter']+ ': '+ toc[i]['subtitle'];
		
		var row;

		if(typeof toc[i]['sections'] !== 'undefined'){
			row = new MenuTableRow({ index: i, title: title, children: true });
			row.addEventListener('click', function(e){
				//self.hide(menuTable);
				//menuTable = new MenuTable();			
				menuTitle.setText(toc[this.rowIndex]['chapter']);
				backButton.show();
				
				backButton.addEventListener('click',function(e){
					menuTable.setData(tableData);
					self.setHeight(defaultH);
					menuTitle.setText('Content');
					backButton.hide();
				});

				var sections = toc[this.rowIndex]['sections'];
				self.setHeight(50*(sections.length));
				var data = [];
				for(var j = 1; j < sections.length-1; j++){
					title = (typeof sections[j]['subtitle'] === 'undefined') ? sections[j]['section'] : sections[j]['section']+ ': '+sections[j]['subtitle'];
					var row2 = new MenuTableRow({ index: j, title: title });
					row2.addEventListener('click', function(e){
						page = sections[this.rowIndex]['page'];
						changePage(page);
					});
					data.push(row2);
				}
				menuTable.setData(data);

				//self.add(menuTable);
			});

		}
		else{
			row = new MenuTableRow({index: i, title: title});
			row.addEventListener('click', function(e){
				page = toc[this.rowIndex]['page'];
				changePage(page);
			});
		}
		tableData.push(row);
	}	
	menuTable.setData(tableData);
	
	self.add(menuTable);

	
	
	//self.add(videoButton);

	return self;
}

module.exports = MenuWindow;