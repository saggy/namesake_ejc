function load(page){
	/*
	params = getQueryParams(document.location.search);
	alert(JSON.stringify(params));
	highlightSearchTerm(params.search_term);*/
	//add id's to every element (or change id)
   spanPage(page);
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


function siteOnload() //only adding event listeners after site loads
    {
   
Ti.App.addEventListener('app:highlightSearchTermWV', function(e){
	highlightSearchTerm(e.searchTerm);
});
Ti.App.addEventListener('app:answerquestion',function(e){
	document.getElementById(e.elementId).innerHTML=e.text;
	});
	
Ti.App.addEventListener('app:addBookmark', function(e){
	var imageSrc = '../../images/buttons/bookmarkIcon.png';
	var height = 20;
	var width = 20;
	var id = 'bookmark' + e.startId + '_' + e.endId;
	var imageTag = '<img id="'+id+'" alt="" src="'+imageSrc+'" height="'+height+'" width="'+width+'" />';
	var id = e.startId;
	var $p = findEnclosingP(id);
	var pHtml = $p.html();
	
	//alert(pHtml);

	if(pHtml.indexOf("<div id='note") !== -1){
		pHtml.replace("<div id='note", imageTag+"<div id='note");
		$p.html(pHtml);
	}
	else if(pHtml.indexOf('<img id="bookmark') === -1){
		$p.html(pHtml+imageTag);
	}
});

Ti.App.addEventListener('app:addHighlight', function(e){

  	var startId = e.startId, endId = e.endId, highlightColor = e.highlightColor;
	var domString = document.body.innerHTML;
	//alert(domString);
	
	var target = '<span id="'+startId+'">'
	var startTag = "<span id=\"highlight"+startId+"\" style=\"background-color:"+highlightColor+"\">";
	var endTag = "</span>";
	
	domString = domString.replace(target, startTag + target);

	for(var i = startId+1; i <= endId ; i++){
		startTag =  "<span id=\"highlight"+i+"\" style=\"background-color:"+highlightColor+"\">";//startTag.replace(i-1,i);
		target = '<span id="'+i+'">';//target.replace(i-1,i);
//alert(startTag + ' '+ target);
		domString = domString.replace(target, endTag+startTag+target);
	}

	var endId = endId+1;
	target = '<span id="'+endId+'">';//target.replace(endId, endId+1);
	domString = domString.replace(target, endTag + target);
	
	document.body.innerHTML = domString;
});


Ti.App.addEventListener('app:addNote', function(e){
	var id = e.startId + '_' + e.endId;
//alert(e.id);
	e.note = (e.note != null) ? e.note : '';
	var annotation = JSON.stringify(e);
	var noteView = "<div id='note" + id + "'><span class='mynotesheader' onclick='saveNote(this)' id='header" + id + "' annotation='"+annotation+
			"'></span><textarea id='text" + id + "' onblur='saveNote(this)' annotation='"+annotation+"'>"+e.note +"</textarea></div>";
	var $p = findEnclosingP(e.startId);
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
		$p = findEnclosingP(e.startId);
		$p.attr('note', true)
	}
});


Ti.App.addEventListener('app:changeFontSizeWV', function(e){
	var elems = ['textarea','.answertable','.command',
			'.PoetryText1','.PoetryText2','.PoetryText3','.PoetryText4','.PoetryText5',
			'p','table'];
	for(var i = 0, len = elems.length; i < len; i++){
		var prev = $(elems[i]).css("font-size");
		if(typeof(prev) !== 'undefined'){
			prev = parseFloat(prev);
			prev /= e.previous;
			var curr = prev * e.current;
			$(elems[i]).css("font-size", curr+"px");
		}
	}
	
});
    }

window.onload = siteOnload;

function spanPage (page) {
	
// STEP 1 - add/change ID tags for LI and P 
// However remember that today's PopupMenuWeb change the UIMenuController entries for the entire webview, not by element tag name
// so you will likely want to expand this to H1-H4 tags as well.
var counter = 0;

var elements = document.body.getElementsByTagName('p');

for (var i = 0; i < elements.length; i++) {
	counter = counter + 1;
	elements[i].id = page + 'p' + counter;
}

counter = 0;
elements = document.body.getElementsByTagName('li');
for (var i = 0; i < elements.length; i++) {
	counter = counter + 1;
    elements[i].id = page + 'ul' + counter; 
}

	
// STEP 2 - add span tags programmatically for each element with an id.

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
