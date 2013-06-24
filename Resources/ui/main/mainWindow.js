
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
	var startPage = 1;
	var NOTE = '0', BOOKMARK = '1', HIGHLIGHT = '2';

	Ti.include('ui/settings/settings.js');

	var highlightColor = (!Ti.App.Properties.hasProperty('highlightColor')) ? DEFAULT_HIGHLIGHT_COLOR : Ti.App.Properties.getInt('highlightColor'); 
	var fontSize =  (!Ti.App.Properties.hasProperty('fontSize')) ? DEFAULT_FONT_SIZE : Ti.App.Properties.getInt('fontSize'); 
	
	
	//import view elements
	var PopupMenuWeb = require('com.mywebrank.popupmenuweb');
	var MenuButton = require('ui/main/navbar/menubutton/MenuButton'),
			menuButton = new MenuButton();
	var	SettingsButton = require('ui/main/navbar/settingsbutton/SettingsButton'),
			settingsButton = new SettingsButton();
	var InfoButton = require('ui/main/navbar/infobutton/InfoButton'),
			infoButton = new InfoButton();
	var ToolsButton = require('ui/main/navbar/toolsbutton/ToolsButton'),
			toolsButton = new ToolsButton();
	var WebView = require('ui/main/webview/WebView');
			webView = new WebView({page: startPage});
	
	var ToolsWindow = require('ui/toolstabset/ToolsWindow'),
			toolsWindow = new ToolsWindow();
	var SettingsWindow = require('ui/settings/SettingsWindow'),
			settingsWindow = new SettingsWindow();

	var BibleWindow = require('ui/main/BibleWindow'),
			bibleWindow = new BibleWindow();
	self.add(bibleWindow);
	//bibleWindow.hide();


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
		toolsWindow.fireEvent('refreshTable', {});
		toolsWindow.show({view: toolsButton, animated:true});	
		
	});
	
	settingsButton.addEventListener('click', function(e){
		settingsWindow.show({view: settingsButton, animated:true});
	});

	settingsWindow.addEventListener('changeHighlight', function(e){
		highlightColor = e.index;
		Ti.App.Properties.setInt('highlightColor', highlightColor);
	});
	settingsWindow.addEventListener('changeFontSize', function(e){
		
		var fontSize = settings[FONT_SIZE].data[e.index].value;

		Ti.App.Properties.setInt('fontSize', e.index);
		Ti.App.fireEvent('app:changeFontSizeWV', {fontSize: fontSize});

	});

	// add navigation bar

	var rightNav = Ti.UI.createView({ width: 135, height: 38 });
	rightNav.add(infoButton);
	rightNav.add(settingsButton);
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
		
		var query = 'INSERT INTO annotation (note_text, note_html, page, page_no, start_id, end_id, type, note, row_index, highlight_color, create_date, modify_date, start_offset, end_offset) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		var editQuery = 'UPDATE annotation SET note=?, modify_date=? WHERE annotation_id=?';
		if(a.id == null){
			db.execute(query, a.noteText, a.noteHtml, a.page, a.pageNo, a.startId, a.endId, a.aType, a.note, a.rowIndex, highlightColor, a.created, a.modified, a.startOffset, a.endOffset);
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
			result.answered = true;
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
	
	Ti.App.addEventListener('gotopage', function(e){
		if(typeof(e.searchTerm) !== 'undefined'){
			webView.searchPage(e.pageNo, e.searchTerm);
		}
		webView.goToPage(e.pageNo);
	});
	
	Ti.App.addEventListener('editnote', function(e){
		e.index = NOTE;
		webView.fireEvent('selection', e);
	});
	
	Ti.App.addEventListener('playvideo', function(e){
		url = 'videos/'+e.video;
		var videoPlayer = new VideoPlayer({url: url});
		//self.add(videoPlayer);
		videoPlayer.open({	        modal:true,
            							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL ,
            							modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
            							});
	});


	Ti.App.addEventListener('biblepop', function(e) { 
		verse = e.verse.split('.');
	
		bibleWindow.goToVerse({book:verse[0], chapter:verse[1], verse:verse[2], searchTerm: typeof(e.searchTerm) === 'undefined' ? '' : e.searchTerm});
		
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
