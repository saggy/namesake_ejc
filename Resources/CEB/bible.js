
var bible =             [{title:'Genesis', url: '01-Genesis-CEB.html', xml: '01-Genesis-CEB.xml', shortName: 'Gen', rowId: 0, chapterCnt: 50}, 
                        {title:'Exodus', url: '02-Exodus-CEB.html', xml: '02-Exodus-CEB.xml', shortName: 'Exod', rowId: 1, chapterCnt: 40}, 
                        {title:'Leviticus', url: '03-Leviticus-CEB.html', xml: '03-Leviticus-CEB.xml', shortName: 'Lev', rowId: 2, chapterCnt: 27}, 
                        {title:'Numbers', url: '04-Numbers-CEB.html', xml: '04-Numbers-CEB.xml', shortName: 'Num', rowId: 3, chapterCnt: 36}, 
                        {title:'Deuteronomy', url: '05-Deuteronomy-CEB.html', xml: '05-Deuteronomy-CEB.xml', shortName: 'Deut', rowId: 4, chapterCnt: 34}, 
                        {title:'Joshua', url: '06-Joshua-CEB.html', xml: '06-Joshua-CEB.xml', shortName: 'Josh', rowId: 5, chapterCnt: 24},
                        {title:'Judges', url: '07-Judges-CEB.html', xml: '07-Judges-CEB.xml', shortName: 'Judg', rowId: 6, chapterCnt: 21},
                        {title:'Ruth', url: '08-Ruth-CEB.html', xml: '08-Ruth-CEB.xml', shortName: 'Ruth', rowId: 7, chapterCnt: 4},
                        {title:'1 Samuel', url: '09-1Samuel-CEB.html', xml: '09-1Samuel-CEB.xml', shortName: '1Sam', rowId: 8, chapterCnt: 31},
                        {title:'2 Samuel', url: '10-2Samuel-CEB.html', xml: '10-2Samuel-CEB.xml', shortName: '2Sam', rowId: 9, chapterCnt: 24},
                        {title:'1 Kings', url: '11-1Kings-CEB.html', xml: '11-1Kings-CEB.xml', shortName: '1Kgs', rowId: 10, chapterCnt: 22},
                        {title:'2 Kings', url: '12-2Kings-CEB.html', xml: '12-2Kings-CEB.xml', shortName: '2Kgs', rowId: 11, chapterCnt: 25},
                        {title:'1 Chronicles', url: '13-1Chronicles-CEB.html', xml: '13-1Chronicles-CEB.xml', shortName: '1Chr', rowId: 12, chapterCnt: 29},
                        {title:'2 Chronicles', url: '14-2Chronicles-CEB.html', xml: '14-2Chronicles-CEB.xml', shortName: '2Chr', rowId: 13, chapterCnt: 36},
                        {title:'Ezra', url: '15-Ezra-CEB.html', xml: '15-Ezra-CEB.xml', shortName: 'Ezra', rowId: 14, chapterCnt: 10},
                        {title:'Nehemiah', url: '16-Nehemiah-CEB.html', xml: '16-Nehemiah-CEB.xml', shortName: 'Neh', rowId: 15, chapterCnt: 13},
                        {title:'Esther', url: '17-Esther-CEB.html', xml: '17-Esther-CEB.xml', shortName: 'Esth', rowId: 16, chapterCnt: 10},
                        {title:'Job', url: '18-Job-CEB.html', xml: '18-Job-CEB.xml', shortName: 'Job', rowId: 17, chapterCnt: 42},
                        {title:'Psalm', url: '19-Psalms-CEB.html', xml: '19-Psalms-CEB.xml', shortName: 'Ps', rowId: 18, chapterCnt: 150},
                        {title:'Proverbs', url: '20-Proverbs-CEB.html', xml: '20-Proverbs-CEB.xml', shortName: 'Prov', rowId: 19, chapterCnt: 31},
                        {title:'Ecclesiastes', url: '21-Eccl-CEB.html', xml: '21-Eccl-CEB.xml', shortName: 'Eccl', rowId: 20, chapterCnt: 12},
                        {title:'Song of Solomon', url: '22-Song-CEB.html', xml: '22-Song-CEB.xml', shortName: 'Song', rowId: 21, chapterCnt: 8},
                        {title:'Isaiah', url: '23-Isaiah-CEB.html', xml: '23-Isaiah-CEB.xml', shortName: 'Isa', rowId: 22, chapterCnt: 66},
                        {title:'Jeremiah', url: '24-Jeremiah-CEB.html', xml: '24-Jeremiah-CEB.xml', shortName: 'Jer', rowId: 23, chapterCnt: 52},
                        {title:'Lamentations', url: '25-Lamentations-CEB.html', xml: '25-Lamentations-CEB.xml', shortName: 'Lam', rowId: 24, chapterCnt: 5},
                        {title:'Ezekiel', url: '26-Ezekiel-CEB.html', xml: '26-Ezekiel-CEB.xml', shortName: 'Ezek', rowId: 25, chapterCnt: 48},
                        {title:'Daniel', url: '27-Daniel-CEB.html', xml: '27-Daniel-CEB.xml', shortName: 'Dan', rowId: 26, chapterCnt: 12},
                        {title:'Hosea', url: '28-Hosea-CEB.html', xml: '28-Hosea-CEB.xml', shortName: 'Hos', rowId: 27, chapterCnt: 14},
                        {title:'Joel', url: '29-Joel-CEB.html', xml: '29-Joel-CEB.xml', shortName: 'Joel', rowId: 28, chapterCnt: 3},
                        {title:'Amos', url: '30-Amos-CEB.html', xml: '30-Amos-CEB.xml', shortName: 'Amos', rowId: 29, chapterCnt: 9},
                        {title:'Obadiah', url: '31-Obadiah-CEB.html', xml: '31-Obadiah-CEB.xml', shortName: 'Obad', rowId: 30, chapterCnt: 1},
                        {title:'Jonah', url: '32-Jonah-CEB.html', xml: '32-Jonah-CEB.xml', shortName: 'Jonah', rowId: 31, chapterCnt: 4},
                        {title:'Micah', url: '33-Micah-CEB.html', xml: '33-Micah-CEB.xml', shortName: 'Mic', rowId: 32, chapterCnt: 7},
                        {title:'Nahum', url: '34-Nahum-CEB.html', xml: '34-Nahum-CEB.xml', shortName: 'Nah', rowId: 33, chapterCnt: 3},
                        {title:'Habakkuk', url: '35-Habakkuk-CEB.html', xml: '35-Habakkuk-CEB.xml', shortName: 'Hab', rowId: 34, chapterCnt: 3},
                        {title:'Zephaniah', url: '36-Zephaniah-CEB.html', xml: '36-Zephaniah-CEB.xml', shortName: 'Zeph', rowId: 35, chapterCnt: 3},
                        {title:'Haggai', url: '37-Haggai-CEB.html', xml: '37-Haggai-CEB.xml', shortName: 'Hag', rowId: 36, chapterCnt: 2},
                        {title:'Zechariah', url: '38-Zechariah-CEB.html', xml: '38-Zechariah-CEB.xml', shortName: 'Zech', rowId: 37, chapterCnt: 14},
                        {title:'Malachi', url: '39-Malachi-CEB.html', xml: '39-Malachi-CEB.xml', shortName: 'Mal', rowId: 38, chapterCnt: 4},
                        {title:'Matthew', url: '40-Matthew-CEB.html', xml: '40-Matthew-CEB.xml', shortName: 'Matt', rowId: 39, chapterCnt: 28},
                        {title:'Mark', url: '41-Mark-CEB.html', xml: '41-Mark-CEB.xml', shortName: 'Mark', rowId: 40, chapterCnt: 16},
                        {title:'Luke', url: '42-Luke-CEB.html', xml: '42-Luke-CEB.xml', shortName: 'Luke', rowId: 41, chapterCnt: 24},
                        {title:'John', url: '43-John-CEB.html', xml: '43-John-CEB.xml', shortName: 'John', rowId: 42, chapterCnt: 21},
                        {title:'Acts', url: '44-Acts-CEB.html', xml: '44-Acts-CEB.xml', shortName: 'Acts', rowId: 43, chapterCnt: 28},
                        {title:'Romans', url: '45-Romans-CEB.html', xml: '45-Romans-CEB.xml', shortName: 'Rom', rowId: 44, chapterCnt: 16},
                        {title:'1 Corinthians', url: '46-1Corinthians-CEB.html', xml: '46-1Corinthians-CEB.xml', shortName: '1Cor', rowId: 45, chapterCnt: 16},
                        {title:'2 Corinthians', url: '47-2Corinthians-CEB.html', xml: '47-2Corinthians-CEB.xml', shortName: '2Cor', rowId: 46, chapterCnt: 13},
                        {title:'Galatians', url: '48-Galatians-CEB.html', xml: '48-Galatians-CEB.xml', shortName: 'Gal', rowId: 47, chapterCnt: 6},
                        {title:'Ephesians', url: '49-Ephesians-CEB.html', xml: '49-Ephesians-CEB.xml', shortName: 'Eph', rowId: 48, chapterCnt: 6},
                        {title:'Philippians', url: '50-Philippians-CEB.html', xml: '50-Philippians-CEB.xml', shortName: 'Phil', rowId: 49, chapterCnt: 4},
                        {title:'Colossians', url: '51-Colossians-CEB.html', xml: '51-Colossians-CEB.xml', shortName: 'Col', rowId: 50, chapterCnt: 4},
                        {title:'1 Thessalonians', url: '52-1Thessalonians-CEB.html', xml: '52-1Thessalonians-CEB.xml', shortName: '1Thess', rowId: 51, chapterCnt: 5},
                        {title:'2 Thessalonians', url: '53-2Thessalonians-CEB.html', xml: '53-2Thessalonians-CEB.xml', shortName: '2Thess', rowId: 52, chapterCnt: 3},
                        {title:'1 Timothy', url: '54-1Timothy-CEB.html', xml: '54-1Timothy-CEB.xml', shortName: '1Tim', rowId: 53, chapterCnt: 6},
                        {title:'2 Timothy', url: '55-2Timothy-CEB.html', xml: '55-2Timothy-CEB.xml', shortName: '2Tim', rowId: 54, chapterCnt: 4},
                        {title:'Titus', url: '56-Titus-CEB.html', xml: '56-Titus-CEB.xml', shortName: 'Titus', rowId: 55, chapterCnt: 3},
                        {title:'Philemon', url: '57-Philemon-CEB.html', xml: '57-Philemon-CEB.xml', shortName: 'Phlm', rowId: 56, chapterCnt: 1},
                        {title:'Hebrews', url: '58-Hebrews-CEB.html', xml: '58-Hebrews-CEB.xml', shortName: 'Heb', rowId: 57, chapterCnt: 13},
                        {title:'James', url: '59-James-CEB.html', xml: '59-James-CEB.xml', shortName: 'Jas', rowId: 58, chapterCnt: 5},
                        {title:'1 Peter', url: '60-1Peter-CEB.html', xml: '60-1Peter-CEB.xml', shortName: '1Pet', rowId: 59, chapterCnt: 5},
                        {title:'2 Peter', url: '61-2Peter-CEB.html', xml: '61-2Peter-CEB.xml', shortName: '2Pet', rowId: 60, chapterCnt: 3},
                        {title:'1 John', url: '62-1John-CEB.html', xml: '62-1John-CEB.xml', shortName: '1John', rowId: 61, chapterCnt: 5},
                        {title:'2 John', url: '63-2John-CEB.html', xml: '63-2John-CEB.xml', shortName: '2John', rowId: 62, chapterCnt: 1},
                        {title:'3 John', url: '64-3John-CEB.html', xml: '64-3John-CEB.xml', shortName: '3John', rowId: 63, chapterCnt: 1},
                        {title:'Jude', url: '65-Jude-CEB.html', xml: '65-Jude-CEB.xml', shortName: 'Jude', rowId: 64, chapterCnt: 1},
                        {title:'Revelation', url: '66-Revelation-CEB.html', xml: '66-Revelation-CEB.xml', shortName: 'Rev', rowId: 65, chapterCnt: 22}];
                        

	function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	    var arrReturnElements = new Array();
	    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
	    var oCurrent;
	    var oAttribute;
	    for(var i=0; i<arrElements.length; i++){
		 oCurrent = arrElements[i];
		 oAttribute = oCurrent.getAttribute(strAttributeName);
		  if(typeof oAttribute == "string" && oAttribute.length > 0){
	   		 if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
	      		  arrReturnElements.push(oCurrent);
	    		}
			}
		}
		return arrReturnElements;
	}
	
    function load(){
   		var params = getQueryParams(document.location.search);
		//scrollToChapterVerse(params.book,params.chapter,params.verse);
		highlightSearchTerm(params.search_term);

    }
    
    Ti.App.addEventListener('gotoVerse', function(params) 
{ 
     if (typeof document != 'undefined') scrollToChapterVerse(params.book,params.chapter,params.verse);
});


	function scrollToChapterVerse(ShortBookName, chapter, verse) {
		var verses = getElementsByAttribute(document.body, "*", "verse", ShortBookName +"." + chapter + "." + verse);
		//verses[0].scrollIntoView(true);
		$("body,html,document").scrollTop($(verses[0]).offset().top);
		window.scrollBy(0,-10); //fudge it a bit, I don't want it at exact top.
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
	
	function showRef(element, id) {
		var ref = document.getElementById(id);
		$("body,html,document").scrollTop($(ref).offset().top);
		
	}
	
	function highlightSearchTerm(term){
		var domString = document.body.innerHTML;
		var regex = new RegExp(">([^<]*)?("+term+")([^>]*)?<","ig");

      	document.body.innerHTML = domString.replace(regex,'>$1<span class="highlighted term" style="background-color:#00FFFF">$2</span>$3<');
	}
		
		//this, '1Sam.1.22!note.g')
	
