
function mainWindow() {
	// initialized main window
	var self = Ti.UI.createWindow({
		title:'Namesake',
		backgroundColor:'white',
		tabBarHidden: true,
		barColor: '#0096DE'//,
		//backgroundImage: 'images/mainWindow/mainBackgroundPortrait.png'
	});
	
	//set variables for database and start page of webview
	var dbName = 'namesake';
	var startPage = 15;
	var NOTE = '0', BOOKMARK = '1', HIGHLIGHT = '2';



	//import view elements
	var PopupMenuWeb = require('com.mywebrank.popupmenuweb');
	var MenuButton = require('ui/main/navbar/menubutton/MenuButton'),
			menuButton = new MenuButton();
	var InfoButton = require('ui/main/navbar/infobutton/InfoButton'),
			infoButton = new InfoButton();
	var ToolsButton = require('ui/main/navbar/toolsbutton/ToolsButton'),
			toolsButton = new ToolsButton();
	var WebView = require('ui/main/webview/WebView'),
			webView = new WebView({page: startPage});
	
	var ToolsWindow = require('ui/toolstabset/ToolsWindow'),
			toolsWindow = new ToolsWindow();
	var BibleWindow = require('ui/main/BibleWindow');

	var MenuWindow = require('ui/menu/MenuWindow'),
			menuWindow = new MenuWindow({webView: webView});
	var VideoPlayer = require('ui/main/VideoPlayer');
	var ResponseDialog = require('ui/main/ResponseDialog');

	// show menu
	menuButton.addEventListener('click', function(e){
		//self.add(menuWindow);
		menuWindow.show({view: menuButton, animated:true});
	});

	// show tools
	toolsButton.addEventListener('click', function(e){
		toolsWindow.show({view: toolsButton, animated:true});	
		toolsWindow.addEventListener('update', function(e){
			toolsWindow.hide();
			toolsWindow.show({view: toolsButton, animated: false});
		});
	});

	// add navigation bar

	var rightNav = Ti.UI.createView({ width: 90, height: 38 });
	rightNav.add(infoButton);
	rightNav.add(toolsButton);
	
	self.setLeftNavButton(menuButton);
	self.setRightNavButton(rightNav);
		

	
	infoButton.addEventListener('click', function(e){
		var aboutWindow = require('ui/info/aboutWindow'),
		about = new aboutWindow({title:'About', containingTab:self.containingTab,tabGroup:self.tabGroup});
		about.containingTab = self.containingTab;
		self.containingTab.open(about,{animated:true});
	});
	// add webview
	self.add(webView);
	Ti.App.addEventListener('closebible', function(e){
	
		var page = webView.getPage();
		self.remove(webView);
		webView = new WebView({page: page});
		self.add(webView);
	});

	
	function saveAnnotation(a){
		var db = Ti.Database.open(dbName);
		Ti.API.info(a.noteText);
		Ti.API.info(a.page);
		Ti.API.info(a.pageNo);
		Ti.API.info(a.note);
		Ti.API.info(a.id);
		console.log('\n');
		a.rowIndex = db.execute('SELECT COUNT(*) FROM annotation WHERE type=?', a.aType).field(0, Ti.Database.FIELD_TYPE_INT);
		console.log('rowIndex: ', a.rowIndex);
		
		var query = 'INSERT INTO annotation (note_text, note_html, page, page_no, start_id, end_id, type, note, row_index, highlight_color, create_date, modify_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
		var editQuery = 'UPDATE annotation SET note=?, modify_date=? WHERE annotation_id=?';
		if(a.id == null){
			db.execute(query, a.noteText, a.noteHtml, a.page, a.pageNo, a.startId, a.endId, a.aType, a.note, a.rowIndex, a.highlightColor, a.created, a.modified);
		}
		else{
			db.execute(editQuery, a.note, a.modified, a.id);
		}
		db.close();	
	}
	

	function findAnswer(_args){
		var result = { elementId: _args.id };
		var db = Ti.Database.open(dbName);
		
		var results = db.execute('SELECT answer_id, answer_text FROM answer WHERE page=? AND answer_elementid=?',webView.getUrl().split('/').splice(-3).join('/'),result.elementId);
		result.text = '';
		if(results.isValidRow()){
			result.id = results.fieldByName('answer_id');
			result.text = results.fieldByName('answer_text'); 
			result.answered = result.text != '';
		}
		results.close();
		db.close();
		
		return result;
	}
	
	function saveAnswer(answer){
		var query = 'INSERT INTO answer (answer_elementid, answer_text, page, page_no, type, create_date, modify_date) VALUES (?,?,?,?,?,?,?)';
		var editQuery = 'UPDATE answer SET answer_text=?, modify_date=? WHERE answer_id=?';
		
		var db = Ti.Database.open(dbName);

		if(answer.answered){
			//console.log(answer.text);
			db.execute(editQuery, answer.text, answer.modified, answer.id);
		} else{
			/*
			console.log(answer.answered);
			console.log(answer.text);
			console.log(answer.id);
			console.log(answer.elementId);*/
			db.execute(query, answer.elementId, answer.text, answer.page, answer.pageNo, answer.type, answer.created, answer.modified);
		}

		db.close();
		Ti.App.fireEvent('app:answerquestion', answer);
	}
	
	Ti.App.addEventListener('reload',function(e){
		webView.reload();
	});
	Ti.App.addEventListener('saveannotation',function(e){
		saveAnnotation(e);
		if(e.aType == 'note'){
			webView.reload();
		}
	});
	
	Ti.App.addEventListener('gotopage', function(e){
		webView.goToPage(e.pageNo);
	});
	
	Ti.App.addEventListener('editnote', function(e){
		e.index = NOTE;
		webView.fireEvent('selection', e);
	});
	
	Ti.App.addEventListener('playvideo', function(e){
		url = 'videos/'+e.video;
		var videoPlayer = new VideoPlayer({url: url});
		self.add(videoPlayer);
	});

	Ti.App.addEventListener('biblepop', function(e) { 
		verse = e.verse.split('.');
	
		bibleWindow = new BibleWindow({book:verse[0], chapter:verse[1], verse:verse[2]});
		bibleWindow.addEventListener('hide', function(e){
			var page = webView.getPage();
			self.remove(webView);
			webView = new WebView({page: page});
			self.add(webView);
		});
		var pHeight = Ti.Platform.displayCaps.platformHeight;
	
		
		var invisView = Titanium.UI.createButton({
   			top: pHeight / 2,
   			right: 0,
   			width: 1,
  			height: 1
		});
		
		self.add(invisView);

		bibleWindow.show({view: invisView, animated:true});
		self.remove(invisView);
		
	});
	Ti.App.addEventListener('blankfill', function(e) {
		var answer = findAnswer({id: e.id});
		
		var responseDialog = new ResponseDialog({question: e.question, answer: answer.text});
		
			
        responseDialog.open({	        modal:true,
            							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
            							modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
            							
          							


		responseDialog.addEventListener('done', function(ev){
			answer.text = ev.text
			answer.created = +new Date();
			answer.modified = answer.created;
			
			
			answer.page = webView.getUrl().split('/').splice(-3).join('/');
			answer.pageNo = webView.getPage();

			answer.type = 'fillintheblank';
			saveAnswer(answer);
			responseDialog.close();

		});
	});

	Ti.App.addEventListener('answer', function(e) {
		var answer = findAnswer({id: e.id});
		
		var responseDialog = new ResponseDialog({question: e.question, answer: answer.text});
		
        responseDialog.open({	        modal:true,
            							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
            							modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
            							});
            							


		responseDialog.addEventListener('done', function(ev){
			answer.text = ev.text
			answer.created = +new Date();
			answer.modified = answer.created;
			
			
			answer.page = webView.getUrl().split('/').splice(-3).join('/');
			answer.pageNo = webView.getPage();
			//console.log(page);
			
			switch(e.id.charAt(0)){
				case 's':
					answer.type = 'shortanswer';
					break;
				case 'a':
					answer.type = 'longanswer';
					break;			
			}
			
			saveAnswer(answer);
			responseDialog.close();

		});
	});

	return self;
};

module.exports = mainWindow;
