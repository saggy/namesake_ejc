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


Ti.App.addEventListener('app:answerquestion',function(e){
	document.getElementById(e.elementId).innerHTML=e.text;
});

Ti.App.addEventListener('app:addBookmark', function(e){
	var imageSrc = '../../images/buttons/menu.png';
	var height = 20;
	var width = 20;
	var id = 'bookmark' + e.startId + '_' + e.endId;
	var imageTag = '<img id="'+id+'" alt="" src="'+imageSrc+'" height="'+height+'" width="'+width+'" />';
	var id = '#'+e.startId;
	var $p = $(id).parent();
	var pHtml = $p.html();
	
	//alert(pHtml);
	if(pHtml.indexOf('<img id="bookmark') === -1){
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
	previous = typeof(previous) !=='undefined' ? previous : false;
	
	if(!previous){
		var pHtml = $p.html();
		$p.html(pHtml+noteView);
		$p.attr('note', true);
	}
});