function MenuWindow(_args){
	var webView = _args.webView;
	
	Ti.include('book/book.js');
	var self = Ti.UI.iPad.createPopover({
            width:350, 
            height: 400,
            arrowDirection: Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP,
            backgroundColor: '#FFFFFF',
            title: 'Content'
            });
	
	var emptyView = Titanium.UI.createView({});
	self.leftNavButton = emptyView
		

	var toc = book[0]['toc'];
	var defaultH = 50*(toc.length);

	self.setHeight(defaultH);
	
	
	var MenuTable = require('ui/menu/MenuTable'),
		menuTable = new MenuTable();
	var MenuTableRow = require('ui/menu/MenuTableRow');
	

	var tableData = [];
	var backButton = Titanium.UI.createImageView({height: 38, width: 44, top: 0, left:0, backgroundImage: 'images/buttons/backArrow.png'}); 


	

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
				self.setTitle(toc[this.rowIndex]['chapter']);
				//backButton.show();
				self.leftNavButton = backButton;
				
				backButton.addEventListener('click',function(e){
					menuTable.setData(tableData);
					self.setHeight(defaultH);
					self.setTitle('Content');
					//backButton.hide();
					self.leftNavButton = emptyView;
				});

				var sections = toc[this.rowIndex]['sections'];
				self.setHeight(50*(sections.length-2));
				var data = [];
				for(var j = 1; j < sections.length-1; j++){
					title = (typeof sections[j]['subtitle'] === 'undefined') ? sections[j]['section'] : sections[j]['section']+ ': '+sections[j]['subtitle'];
					var row2 = new MenuTableRow({ index: j, title: title });
					row2.addEventListener('click', function(e){
						page = sections[this.rowIndex]['page'];
						changePage(page);
						self.hide();
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