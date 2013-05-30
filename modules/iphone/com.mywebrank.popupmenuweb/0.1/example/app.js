
// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
win.open();


var PopupMenuWeb = require('com.mywebrank.popupmenuweb');


var webview = Ti.UI.createWebView({
	url: "http://en.wikipedia.org/wiki/Appcelerator_Titanium",
	left:0,
	top: 0,
	width: '100%',
	height: '100%',
	popupMenu: ["Note", "Search", "Share"]
});
win.add(webview);

webview.addEventListener('selection', function(e) {
	
	Ti.API.info("Button: "+ e.index);
	Ti.API.info("Selection Text: "+ e.text);
	Ti.API.info("Selection HTML: "+ e.html);

	alert(JSON.stringify(e));
});
