window.onload = load;
window.onunload = unload;

    var sel = window.getSelection(), range, range2;
	
	function changeRange(opts) {
		range = document.createRange();
		range.setStart(opts.start, opts.startOffset);
		range.setEnd(opts.end, opts.endOffset);
		sel.removeAllRanges();
		sel.addRange(range);

		cmd("BackColor",false, opts.highlightColor);
	}

	function cmd(cmd, ui, val) {
		document.body.contentEditable='true';
		document.execCommand(cmd, ui, val);
		document.body.contentEditable='false';
	}
			
function load() {
	Ti.App.addEventListener('app:highlightSearchTermWV', highlight_search_term_wv);
	Ti.App.addEventListener('app:answerquestion', answerquestion);
	Ti.App.addEventListener('app:addBookmark', add_bookmark);
	
	//Ti.App.addEventListener('app:saveNewHighlight', save_new_highlight);
	//Ti.App.addEventListener('app:addHighlight', add_highlight);
	Ti.App.addEventListener('app:saveNewHighlight', strange_brew);

	Ti.App.addEventListener('app:addHighlight', strange_brew_add_highlight);
	Ti.App.addEventListener('app:addSearchHighlight', add_search_highlight);
	Ti.App.addEventListener('app:addNote', add_note);
	Ti.App.addEventListener('app:changeFontSizeWV', change_font_size);
	//Ti.App.addEventListener('app:addUserSelection', add_user_selection);
	Ti.App.addEventListener('app:unload', app_unload);
	
	Ti.App.fireEvent('web:addSearchHighlight', {});
	Ti.App.fireEvent('web:setFontSize', {});
	Ti.App.fireEvent('web:addHighlights', { url: document.URL}); 
}


function unload() {
    //Ti.App.removeEventListener('app:addHighlight', add_highlight);
    Ti.App.removeEventListener('app:addHighlight', strange_brew_add_highlight);
	//Ti.App.removeEventListener('app:saveNewHighlight', save_new_highlight);
	Ti.App.removeEventListener('app:saveNewHighlight', strange_brew);
	Ti.App.removeEventListener('app:addUserSelection', add_user_selection);
	Ti.App.removeEventListener('app:changeFontSizeWV', change_font_size);
	Ti.App.removeEventListener('app:addNote', add_note);
	Ti.App.removeEventListener('app:addSearchHighlight', add_search_highlight);
	Ti.App.removeEventListener('app:addBookmark', add_bookmark);
	Ti.App.removeEventListener('app:answerquestion', answerquestion);
	Ti.App.removeEventListener('app:highlightSearchTermWV', highlight_search_term_wv);
	Ti.App.removeEventListener('app:unload', app_unload);
}

function app_unload() {
	unload();
}


function l() {
	var all = document.getElementsByTagName("*");

for (var i=0, max=all.length; i < max; i++) {
     // Do something with the element here
     all[i].setAttribute("i", i);
     var onClick = all[i].getAttribute('onclick');
     if(typeof(onClick) !== 'undefined' && onClick != null){
     	switch(onClick){
			case 'answer(this)':
				all[i].className = 'answer';
				all[i].id = 'a'+i;
				break;
			case 'blankfill(this)':
				all[i].className = 'blankfill';
				all[i].id = 'bf'+i;
				var blanks = all[i].innerHTML;
				var minWidth = (blanks.length/2);
				if (minWidth> 0) all[i].style.minWidth = minWidth + 'em';
				all[i].innerHTML = '';
				break;
		}
	}
	

}
}


function getElementByI(index)
{
  var attribute = 'i';
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0; i < allElements.length; i++)
  {
    if (allElements[i].getAttribute(attribute))
    {
      // Element exists with attribute. Add to array.
     if (allElements[i].getAttribute(attribute) == index) matchingElements.push(allElements[i]);
    }
  }
  
  
  return matchingElements[0];
}

/*
function add_highlight(e) {
	var opts = {};
	if (e.focusNodeId && e.anchorNodeId)	 {
				try {
	if (e.anchorNodeType == 'text' && e.focusNodeType == 'text') {
		var anchorParent = getElementByI(e.anchorNodeId);
		var focusParent = getElementByI(e.focusNodeId);
		opts =  { start: anchorParent.firstChild, startOffset: e.anchorOffset, end: focusParent.firstChild, endOffset: e.focusOffset, highlightColor: e.highlightColor };
	}
	
	if (e.anchorNodeType == 'text' && e.focusNodeType == 'element') {
		var anchorParent = getElementByI(e.anchorNodeId);
		var focusParent = getElementByI(e.focusNodeId);
		opts =  { start: anchorParent.firstChild, startOffset: e.anchorOffset, end: focusParent, endOffset: e.focusOffset, highlightColor: e.highlightColor };
	}
	
		if (e.anchorNodeType == 'element' && e.focusNodeType == 'text') {
		var anchorParent = getElementByI(e.anchorNodeId);
		var focusParent = getElementByI(e.focusNodeId);
		opts =  { start: anchorParent, startOffset: e.anchorOffset, end: focusParent.firstChild, endOffset: e.focusOffset, highlightColor: e.highlightColor };
	}
	
		if (e.anchorNodeType == 'element' && e.focusNodeType == 'element') {
		var anchorParent = getElementByI(e.anchorNodeId);
		var focusParent = getElementByI(e.focusNodeId);
		opts =  { start: anchorParent, startOffset: e.anchorOffset, end: focusParent, endOffset: e.focusOffset, highlightColor: e.highlightColor };
	} } catch (err)
	{
		alert('debug: add_highlight, message: ' + err.message);
	}
	                                     
	changeRange(opts);
	}
}	

function save_new_highlight(annotation) {
	
	    sel = window.getSelection();
    
      if (sel.anchorNode.nodeType == 3)  { //anchorNode is text
      	annotation.anchorNodeId = sel.anchorNode.parentNode.getAttribute("i");
      	annotation.anchorNodeType = 'text';
      } else {
      	annotation.anchorNodeId = sel.anchorNode.getAttribute("i");
      	annotation.anchorNodeType = 'element';
      }
      
      annotation.anchorOffset = sel.anchorOffset;
      
     if (sel.focusNode.nodeType == 3)  { //anchorNode is text
      	annotation.focusNodeId = sel.focusNode.parentNode.getAttribute("i");
      	annotation.focusNodeType = 'text';
      } else {
      	annotation.focusNodeId = sel.focusNode.getAttribute("i");
      	annotation.focusNodeType = 'element';
      }

	
	annotation.focusOffset = sel.focusOffset;
	
    cmd("BackColor",false, annotation.highlightColor);
 	Ti.App.fireEvent('saveannotation', annotation);  

}

function add_user_selection(e) {
	
		var userSel = window.getSelection();
	
	var selRange = userSel.getRangeAt(0);
	var start = selRange.startContainer.parentNode;
	var end = selRange.endContainer.parentNode;
	
	e.startId = start.id;
	e.endId = end.id;
	e.startOffset = selRange.startOffset;
	e.endOffset = selRange.endOffset;
//alert(end.id);
	if(!(e.startId == e.endId && e.startOffset == e.endOffset)){
		var hSpan = document.createElement("span");
		hSpan.style.backgroundColor = e.highlightColor;
		selRange.surroundContents(hSpan);
	

		Ti.App.fireEvent('saveannotation', e);
	}
}
*/
function user_selection_id(){
	var userSel = window.getSelection();
	var selRange = userSel.getRangeAt(0);
	
	var node = selRange.startContainer;
	while(node.nodeName !== 'P'){
		node = node.parentNode;
	}
	return node.id;
}

function change_font_size (e) {
		var elems = ['textarea','.answertable','.command',
			'.PoetryText1','.PoetryText2','.PoetryText3','.PoetryText4','.PoetryText5',
			'p','table', '.tocentry', '.char-style-override-21', '.answer', '.blankfill', '.char-style-override-17', '.char-style-override-23'];
	for(var i = 0, len = elems.length; i < len; i++){
		
			if (i==0){
				$(elems[i]).css("font-size", (e.fontSize + 2) +"px");
			} else {
				$(elems[i]).css("font-size", e.fontSize+"px");
			}

		}
	$('.SUB1').css("font-size", (e.fontSize + 8) +"px");
	$('h2').css("font-size", (e.fontSize + 8) +"px");
	$('h3').css("font-size", (e.fontSize + 8) +"px");
	$('h4').css("font-size", (e.fontSize + 14) +"px");
	$('h5').css("font-size", (e.fontSize + 14) +"px");
	$('.CHD2').css("font-size", (e.fontSize + 14) +"px");
	$('.weekheading').css("font-size", (e.fontSize + 20) +"px");
	$('.CHD1').css("font-size", (e.fontSize + 20) +"px");
	$('.page1Title').css("font-size", (e.fontSize + 60) +"px");
	$('.char-style-override-20').css("font-size", (e.fontSize -6) +"px");
	
	
}

function add_note (e) {
		var id = e.startId;
//alert(e.id);
	e.note = (e.note != null) ? e.note : '';
	var annotation = JSON.stringify(e);
	var noteView = "<div id='note" + id + "' class='notesdiv'><span class='mynotesheader' onclick='saveNote(this)' id='header" + id + "' annotation='"+annotation+
			"'></span><textarea id='text" + id + "' onblur='saveNote(this)' annotation='"+annotation+"'>"+e.note +"</textarea></div>";
	var $p = $('#'+e.startId);
	var previous = $p.attr('note');
	previous = previous ? previous : false;
	//previous = previous=='true' ? true : false;
	
	if(!previous){
		var pHtml = $p[0].outerHTML;
		pHtml.replace('<p', "<p note='true'");
		$p[0].outerHTML = pHtml + noteView;
		/*
		var pHtml = $p.html();
		$p.html(pHtml+noteView);*/
		$p = $('#'+e.startId);
		$p.attr('note', true)
	}
	
}

function add_search_highlight(e) { //http://www.nsftools.com/misc/SearchAndHighlight.htm, doesn't use nodes, probably not fast
	var searchTerm = e.searchWord;
    var highlightStartTag = "<mark>";
    var highlightEndTag = "</mark>";

  var bodyText = document.body.innerHTML;
  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        // skip anything inside a <script> block
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
	document.body.innerHTML = newText;
}


function add_bookmark (e) {
		var imageSrc = '../../images/buttons/bookmarkIcon.png';
	var height = 20;
	var width = 20;
	var id = 'bookmark' + e.startId;
	var imageTag = '<img id="'+id+'" alt="" src="'+imageSrc+'" height="'+height+'" width="'+width+'" />';
	var id = e.startId;
	var $p = $('#'+e.startId);
	var pHtml = $p.html();
	
	//alert(pHtml);

	if(pHtml.indexOf("<div id='note") !== -1){
		pHtml.replace("<div id='note", imageTag+"<div id='note");
		$p.html(pHtml);
	}
	else if(pHtml.indexOf('<img id="bookmark') === -1){
		$p.html(pHtml+imageTag);
	}
	
	
}

function answerquestion (e) {
	document.getElementById(e.elementId).innerHTML=e.text;
}

function highlight_search_term_wv (e) {
	highlightSearchTerm(e.searchTerm);	
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}
	
function highlightSearchTerm(term){
	term = term.slice(0,1) + '<\/span>' + term.slice(1,term.length);
	var domString = document.body.innerHTML;
	//var index = domString.toLowerCase().indexOf(term.toLowerCase());
//alert(index);
	
	var regex = new RegExp(term,"ig");

  	document.body.innerHTML = domString.replace(regex,'<span class="highlighted term" style="background-color:#00FFFF">'+term+'</span>');
}
function biblepop(verse)
{
	Ti.App.fireEvent('biblepop',{verse: verse});
}

function answer(element)
{
	Ti.App.fireEvent('answer',{id: element.id, question: element.getAttribute("question")});
}

function blankfill(element)
{
	Ti.App.fireEvent('blankfill',{id: element.id, correctAnswer: element.getAttribute("correctanswer"), question: element.getAttribute("question")});
}

function playvideo(video)
{
	Ti.App.fireEvent('playvideo',{video: video});
}

function findEnclosingP(id){
	id = '#' + id;
	var $p = $(id).parent();
	while($p[0].nodeName != 'P'){ 
		$p = $p.parent();
	}
	return $p;
}

function saveNote(note){

	var annotation = JSON.parse(note.getAttribute('annotation'));
	if(annotation.note==null || note.value != null){
		annotation.note = note.value;
		Ti.App.fireEvent('saveannotation', annotation);
	}

}

function spanPage () {
var counter = 0;
var id = 0;
var regex = /(<.+?<\/.+?>|\S+)/g;

try {
var elements = document.body.getElementsByTagName('p');

		for (var i = 0; i < elements.length; i++) {
			counter = counter + 1;
			var str = elements[i].innerHTML;
			var result = str.replace(regex, function(a) {
					    var m = (/<(\w+)([^>]*)>([^<]*)<\/\w+>/).exec(a); 
					
					    if (m !== null) {
					    if(typeof m[2].test === 'function') { 
					    if (m !== null && m[1] === "span" && m[2].test(/id=/)) 
					        return a;
					       }}
					       
					    if (m !== null)
					        return "<" + m[1] + m[2] + ">" + m[3].replace(regex, arguments.callee) + "</" + m[1] + ">";
					
					    return "<span id='" + (++id) + "'>" + a.charAt(0) + "</span>" + a.substring(1);
			});
				
			elements[i].innerHTML = result	
		}
		
} catch(err) {
	  //alert(elements[i].innerHTML);
	  alert(err.message); 
}
		

try {
  elements = document.body.getElementsByTagName('li');

		for (var i = 0; i < elements.length; i++) {
			counter = counter + 1;
			var str = elements[i].innerHTML;
			var result = str.replace(regex, function(a) {
					    var m = (/<(\w+)([^>]*)>([^<]*)<\/\w+>/).exec(a);      
					    if (m !== null && m[1] === "span" && m[2].test(/id=/)) 
					        return a;
					    if (m !== null)
					        return "<" + m[1] + m[2] + ">" + m[3].replace(regex, arguments.callee) + "</" + m[1] + ">";
					
					    return "<span id='" + (++id) + "'>" + a.charAt(0) + "</span>" + a.substring(1);
			});
			
			elements[i].innerHTML = result	
		} 
		} catch(err) {
	  		alert(err.message); 
		}

	
}

function strange_brew(annotation) {

		elements = document.getElementsByClassName('answer');
	for (var i=0, max=elements.length; i < max; i++) {
     elements[i].innerHTML = '';
}

		elements = document.getElementsByClassName('blankfill');
	for (var i=0, max=elements.length; i < max; i++) {
     elements[i].innerHTML = '';
}
	//remove notes so that the count isn't put off by user notes
	$('.notesdiv').remove();


		var sel = window.getSelection();
	var range = sel.getRangeAt(0);
	
	var FINDME = 'XYSTART15ZZY'; //literal that does not appear in the text of the book
	var newTextNode = document.createTextNode(FINDME);
	range.insertNode(newTextNode);
	
	var selectedText = annotation.noteText;
	
	var walker1 = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node1;
    var textTest1 = '';
	var page;
    
    while(node1 = walker1.nextNode()) {
    	page = page + node1.nodeValue;
    }
	
	
    //var page = document.body.innerText; //walk the dom and get your own text, so that you are consistent
    
    var startOffset = page.indexOf(FINDME)-9; //why 9?
    
    newTextNode.parentNode.removeChild(newTextNode);
    
    var rangeLength = selectedText.length;
    
    var AFTER = 'XYZSTOP16ZZY';
    var stopNode = document.createTextNode(AFTER);
    range.collapse(false);
	range.insertNode(stopNode);
	
	walker1 = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    node1 = {};
	page = '';
    
    while(node1 = walker1.nextNode()) {
    	page = page + node1.nodeValue;
    }
	 
    var stopOffset = page.indexOf(AFTER); 
    
    stopNode.parentNode.removeChild(stopNode);	

	//OK now imagine this was in a different event listener that was being tasked to highlight text nodes, and you had
	//the text node offset and length from the beginning of the document.
	
	//loop through all elements in the DOM
	
	var arr = [];
		
    var walker = document.createNodeIterator(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
    var textNodes = [];
    var textTest = '';
    var currPos = 0;
    
	//alert('startOffset: ' + startOffset + ', stopOffset: ' + stopOffset);
    
    //ignore leading space
    
var newMark;
var afterText;
var parentSpan;
var textSpan;

var x = 0;
    
    while(node = walker.nextNode()) {

        //textNodes.push(node.nodeValue);
        if ((currPos +  node.nodeValue.length) > startOffset && currPos < stopOffset ) {
        	//do I need a partial node value?
        	if (currPos <= startOffset) {
        		//alert('1:  ' + 'currPos: ' + currPos + ', startOffset: ' + startOffset+ ', stopOffset: ' + stopOffset);
        		textTest = node.nodeValue.substring(startOffset - currPos, stopOffset - currPos);
        		//highlight this
        		try {
        			
        		  afterText = node.nodeValue.substring(stopOffset - currPos, node.nodeValue.length);
        		  var obj = new Object();
        		  obj.newMarkSpan = node.nodeValue.substring(startOffset - currPos, stopOffset - currPos);
        		  obj.newTextSpan = afterText;
                  obj.oldNode = node;
                  obj.objt = 1;
        		  
        		  arr[x] = obj;
        		  x++;
        		  //alert('objt1');
        		  
        		} catch (e) {
        			alert(e.error);
        		}
        	} else {
        		  
        		  if  (currPos  > startOffset && currPos + node.nodeValue.length <= stopOffset ) {
        		  var obj = new Object();
        		  obj.oldNode = node;
        		  obj.newTextSpan = ''
        		  obj.newMarkSpan = node.nodeValue;
        		  obj.objt = 2;
        		  arr[x] = obj;
        		  x++;
        		  } else {
        		  if  (currPos < stopOffset && (currPos + node.nodeValue.length) > stopOffset){
        		  	 var obj = new Object();
        		  obj.oldNode = node;
        		  obj.newMarkSpan = node.nodeValue.substring(0, (stopOffset - currPos));
        		   obj.newTextSpan = node.nodeValue.substring(stopOffset - currPos, node.nodeValue.length );
        		  obj.objt = 3;
        		  arr[x] = obj;
        		  x++;
        		  }
        		  	
        		  }
        		  //node.parentNode.replaceChild(newMark, node);
        		  
        		  textTest = textTest + node.nodeValue;
        	}
        
        		
        } 
        
        currPos = currPos + node.nodeValue.length;
    }
    
    var y = arr.length;
	
		for ( var i=0 ; i < arr.length; i++) {
					y++;
        		  var newMark = document.createElement('mark');
        		  var parentSpan = document.createElement('span'); //adding unnecessary, but unharmful span tags, because I don't know how to do pure text nodes
        		  var textSpan = document.createElement('span');
        		  
        		  try {
        		  switch(arr[i].objt)
        		  {
        		  case 1:	 
        		  newMark.appendChild(document.createTextNode(arr[i].newMarkSpan));
        		  textSpan.appendChild(document.createTextNode(arr[i].newTextSpan));
        		  parentSpan.appendChild(textSpan);
        		  parentSpan.appendChild(newMark);
        		  //parentSpan.appendChild(textSpan);
				  arr[i].oldNode.parentNode.replaceChild(parentSpan, arr[i].oldNode);	
				  break;
				  
				  case 2:
				  newMark.appendChild(document.createTextNode(arr[i].newMarkSpan));
				  arr[i].oldNode.parentNode.replaceChild(newMark, arr[i].oldNode);	
				  break;
				  
				  case 3:
        		  newMark.appendChild(document.createTextNode(arr[i].newMarkSpan));
        		  textSpan.appendChild(document.createTextNode(arr[i].newTextSpan));
        		  textSpan.style.backgroundColor = 'orange';
        		  parentSpan.appendChild(newMark);
        		  parentSpan.appendChild(textSpan);
        		  
				  arr[i].oldNode.parentNode.replaceChild(parentSpan, arr[i].oldNode);	
				  break;
        		  	
        		  }
        		  } catch (e) {
        		  alert(e.message);
        		  }

	}
	
				annotation.startId = startOffset;
				annotation.endId = stopOffset;

	//Ti.App.fireEvent('web:info', {info: document.body.innerHTML});
	
	Ti.App.fireEvent('saveannotation', annotation); 
	
	
	
	
}


function strange_brew_add_highlight(e) {
  	var startOffset = e.startId, stopOffset = e.endId, highlightColor = e.highlightColor;
  	
	var arr = [];
		
    var walker = document.createNodeIterator(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
    var textNodes = [];
    var textTest = '';
    var currPos = 0;
    
	//alert('startOffset: ' + startOffset + ', stopOffset: ' + stopOffset);
    
    //ignore leading space
    
var newMark;
var afterText;
var parentSpan;
var textSpan;

var x = 0;
    
    while(node = walker.nextNode()) {

        //textNodes.push(node.nodeValue);
        if ((currPos +  node.nodeValue.length) > startOffset && currPos < stopOffset ) {
        	//do I need a partial node value?
        	if (currPos <= startOffset) {
        		//alert('1:  ' + 'currPos: ' + currPos + ', startOffset: ' + startOffset+ ', stopOffset: ' + stopOffset);
        		textTest = node.nodeValue.substring(startOffset - currPos, stopOffset - currPos);
        		//highlight this
        		try {
        			
        		  afterText = node.nodeValue.substring(stopOffset - currPos, node.nodeValue.length);
        		  beforeText = node.nodeValue.substring(0, startOffset - currPos);  //this is because the selection object itself is cutting the nodes
        		  Ti.App.fireEvent('web:info', {info:'beforeText: ' + beforeText}); 
        		  var obj = new Object();
        		  obj.newMarkSpan = node.nodeValue.substring(startOffset - currPos, stopOffset - currPos);
        		  obj.newTextSpan = beforeText;
        		  obj.newAfterSpan = afterText;
                  obj.oldNode = node;
                  obj.objt = 1;
        		  
        		  arr[x] = obj;
        		  x++;
        		  //alert('objt1');
        		  
        		} catch (e) {
        			alert(e.error);
        		}
        	} else {
        		  
        		  if  (currPos  > startOffset && currPos + node.nodeValue.length <= stopOffset ) {
        		  var obj = new Object();
        		  obj.oldNode = node;
        		  obj.newTextSpan = ''
        		  obj.newMarkSpan = node.nodeValue;
        		  obj.objt = 2;
        		  arr[x] = obj;
        		  x++;
        		  } else {
        		  if  (currPos < stopOffset && (currPos + node.nodeValue.length) > stopOffset){
        		  	 var obj = new Object();
        		  obj.oldNode = node;
        		  obj.newMarkSpan = node.nodeValue.substring(0, (stopOffset - currPos));
        		   obj.newTextSpan = node.nodeValue.substring(stopOffset - currPos, node.nodeValue.length );
        		  obj.objt = 3;
        		  arr[x] = obj;
        		  x++;
        		  }
        		  	
        		  }
        		  //node.parentNode.replaceChild(newMark, node);
        		  
        		  textTest = textTest + node.nodeValue;
        	}
        
        		
        } 
        
        currPos = currPos + node.nodeValue.length;
    }
    
    var y = arr.length;
	
		for ( var i=0 ; i < arr.length; i++) {
					y++;
        		  var newMark = document.createElement('mark');
        		  var parentSpan = document.createElement('span'); //adding unnecessary, but unharmful span tags, because I don't know how to do pure text nodes
        		  var textSpan = document.createElement('span');
        		   var afterSpan = document.createElement('span');
        		  
        		  try {
        		  switch(arr[i].objt)
        		  {
        		  case 1:	 
        		  newMark.appendChild(document.createTextNode(arr[i].newMarkSpan));
        		  newMark.style.backgroundColor = highlightColor;
        		  textSpan.appendChild(document.createTextNode(arr[i].newTextSpan));
        		  afterSpan.appendChild(document.createTextNode(arr[i].newAfterSpan));
        		  parentSpan.appendChild(textSpan);
        		  parentSpan.appendChild(newMark);
        		  parentSpan.appendChild(afterSpan);
        		  //parentSpan.appendChild(textSpan);
				  arr[i].oldNode.parentNode.replaceChild(parentSpan, arr[i].oldNode);	
				  break;
				  
				  case 2:
				  newMark.appendChild(document.createTextNode(arr[i].newMarkSpan));
				  newMark.style.backgroundColor = highlightColor;
				  arr[i].oldNode.parentNode.replaceChild(newMark, arr[i].oldNode);	
				  break;
				  
				  case 3:
        		  newMark.appendChild(document.createTextNode(arr[i].newMarkSpan));
        		  newMark.style.backgroundColor = highlightColor;
        		  textSpan.appendChild(document.createTextNode(arr[i].newTextSpan));
        		  parentSpan.appendChild(newMark);
        		  parentSpan.appendChild(textSpan);
        		  
				  arr[i].oldNode.parentNode.replaceChild(parentSpan, arr[i].oldNode);	
				  break;
        		  	
        		  }
        		  } catch (e) {
        		  alert(e.message);
        		  }

	}
//Ti.App.fireEvent('web:info', {info: document.body.innerHTML});
}
