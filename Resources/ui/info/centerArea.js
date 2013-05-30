function centerArea(_args){
	var self = Ti.UI.createWindow({
		backgroundColor: 'white',
		title: "",
                height: 639,
                width: 639,
        borderRadius:25,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderColor:'#000',
        borderWidth: 4,
        opacity: .97
    });
    
    var authorImage = Ti.UI.createImageView({
  		image:'/images/jlagrone.png',
  		top: 150,
  		left: 50
		});
	self.add(authorImage);
    

    var title = Titanium.UI.createLabel({
   	color:'#000',
   	text:'Namesake',
   	font:{
      fontSize: 48,
      fontFamily: themevalues.font
   },
   textAlign:'center',
   width:'auto',
   top: 20
});
    
    	self.add(title);
    	
    	    	    var subtitle = Ti.UI.createImageView({
  		image:'/images/aBibleStudy.png',
  		top: 70,
		});
	self.add(subtitle);
    	
   var authorText = Titanium.UI.createLabel({
   	color:'#000',
   	text:'Jessica LaGrone is an acclaimed pastor, teacher, speaker, and writer whose engaging communication style endears her to her audiences. Currently she is Pastor of Worship at The Woodlands United Methodist Church in The Woodlands, Texas, a church with over 8,000 members. In this position she serves as worship architect, planning and developing four of the church’s seven weekly worship experiences and working with contractors whose talent in music, media, and preaching build worship services that shine for the glory of God.',
   	font:{
      fontSize: 14,
      fontFamily: 'Arial'
   },
   width:'auto',
   top: 150,
   left: 200,
   right: 50
});

    
    	self.add(authorText);
    	
    	   var copyrightText = Titanium.UI.createLabel({
   	color:'#000',
   	text:'Copyright © 2013 Abingdon Women',
   	font:{
      fontSize: 14,
      fontFamily: 'Arial',
      fontStyle: 'italic'
   },
   width:'auto',
   bottom: 40
});

    
    	self.add(copyrightText);
    	
    	    	   var otherAppsText = Titanium.UI.createLabel({
   	color:'#000',
   	text:'Also available for iPad',
   	font:{
      fontSize: 14,
      fontFamily: 'Arial',
      fontStyle: 'italic'
   },
   width:'auto',
   top: 370,
   left: 55
});

    
 self.add(otherAppsText);
 
 var advert = Ti.UI.createView({
		backgroundColor: '#eaf4f5',
		title: "",
                height: 150,
                width: 540,
        borderRadius: 15,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderColor:'#bddcdf',
        borderWidth: 3,
        opacity: .97,
        top: 400
    });
    	
    	
    	    var dbkbImage = Ti.UI.createImageView({
  		image:'/images/buttons/dbkb-ipad.png',
  		top: 15,
  		left: 10
		});
	advert.add(dbkbImage);
    	
    	    var DBKBtext = Titanium.UI.createLabel({
   	color:'#000',
   	text:'Kids will dive deep into God’s word with the CEB Deep Blue Kids Bible App. This engaging, interactive Bible offers a wealth of notes, devotionals, Bible trivia, and other interactive elements to capture inquisitive young minds.',
   	font:{
      fontSize: 14,
      fontFamily: 'Arial'
   },
   width:'auto',
   top: 15,
   left: 160,
   right: 10,
   height: 120
});

    
    	advert.add(DBKBtext);
    	
    	advert.addEventListener('click', function(e){
		Titanium.Platform.openURL('itms-apps://ax.itunes.apple.com/us/app/deep-blue-kids-bible/id622397790?ls=1&mt=8');
		//https://itunes.apple.com/us/app/deep-blue-kids-bible/id622397790?ls=1&mt=8
	})	
    	
    	self.add(advert);

//Ti.Platform.openURL('itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=nnnnnnnnnn'

//https://itunes.apple.com/us/app/deep-blue-kids-bible/id622397790?mt=8

//Titanium.Platform.openURL('itms://itunes.com/apps/app-name')

    
    
	return self;
};

module.exports = centerArea;