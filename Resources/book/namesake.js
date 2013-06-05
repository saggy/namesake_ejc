function load(){
	params = getQueryParams(document.location.search);
	//highlightSearchTerm(params.search_term);
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
	alert(term);
	term = term.slice(0,1) + '</span>' + term.slice(1,term.length);

	var domString = document.body.innerHTML;
	var regex = new RegExp(">([^<]*)?("+term+")([^>]*)?<","ig");

  	document.body.innerHTML = domString.replace(regex,'>$1<span class="highlighted term" style="background-color:#00FFFF">$2</span>$3<');
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
	Ti.App.fireEvent('blankfill',{id: element.id, correctAnswer: element.getAttribute("correctanswer")});
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
    	
Ti.App.addEventListener('app:answerquestion',function(e){
	document.getElementById(e.elementId).innerHTML=e.text;
	});
	
Ti.App.addEventListener('app:addBookmark', function(e){
	var imageSrc = '../../images/buttons/menu.png';
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
    
    addSwipeListener(document.body, function(e) { 

	Ti.App.fireEvent('newswipe',{direction: e.direction});
    	//Ti.App.fireEvent('newswipe', e);
    	//alert(e.direction); });	
    	
    });
    
    }

window.onload = siteOnload;

function addSwipeListener(el, listener)
{
 var startX;
 var dx;
 var direction;
 
 function cancelTouch()
 {
  el.removeEventListener('touchmove', onTouchMove);
  el.removeEventListener('touchend', onTouchEnd);
  startX = null;
  startY = null;
  direction = null;
 }
 
 function onTouchMove(e)
 {
  if (e.touches.length > 1)
  {
   cancelTouch();
  }
  else
  {
   dx = e.touches[0].pageX - startX;
   var dy = e.touches[0].pageY - startY;
   if (direction == null)
   {
    direction = dx;
    e.preventDefault();
   }
   else if ((direction < 0 && dx > 0) || (direction > 0 && dx < 0) || Math.abs(dy) > 15)
   {
    cancelTouch();
   }
  }
 }

 function onTouchEnd(e)
 {
  cancelTouch();
  if (Math.abs(dx) > 50)
  {
   listener({ target: el, direction: dx > 0 ? 'right' : 'left' });
  }
 }
 
 function onTouchStart(e)
 {
  if (e.touches.length == 1)
  {
   startX = e.touches[0].pageX;
   startY = e.touches[0].pageY;
   el.addEventListener('touchmove', onTouchMove, false);
   el.addEventListener('touchend', onTouchEnd, false);
  }
 }
 
 el.addEventListener('touchstart', onTouchStart, false);
}

