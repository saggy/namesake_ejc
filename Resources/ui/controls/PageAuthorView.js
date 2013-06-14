function PageAuthorView(_args) {
	var self = Ti.UI.createView({height: 50, width: '90%', bottom: 10,  borderRadius: 10, backgroundColor: 'transparent', opacity: 0.0}); 
	
	var pageView = Ti.UI.createView({height: 50, width: 75, bottom: 0, right:0, borderRadius: 10, backgroundColor: '#DBDBDB'}); 
	var authorView = Ti.UI.createView({height: 50, width: 250, bottom: 0, borderRadius: 10, backgroundColor: '#DBDBDB'});
	
	
	var pageNum = Titanium.UI.createLabel({
   	color:'white',
   	text:'1',
   	font:{
      fontSize: 24,
      fontFamily: themevalues.font
   },
   textAlign:'center',
   width:'auto'
});

	var Author = Titanium.UI.createLabel({
   	color:'white',
   	text:'Jessica LaGrone',
   	font:{
      fontSize: 24,
      fontFamily: themevalues.font
   },
   textAlign:'center',
   width:'auto'
});

   authorView.add(Author);

	pageView.add(pageNum);
	
	self.add(pageView);
	//self.add(authorView);
	
   self.addEventListener('page', function(e){
		pageNum.text = e.page;
		self.animate(pageAuthorShow);
	});
	
	var pageAuthorShow = Ti.UI.createAnimation({
		duration: 500,
		opacity: .99
	});
	
	pageAuthorShow.addEventListener('complete',function()
	{
	   self.animate(pageAuthorContinue);
	});
	
		var pageAuthorContinue = Ti.UI.createAnimation({
		duration: 750,
		opacity: 1.0
	});
	
		pageAuthorContinue.addEventListener('complete',function()
	{
	   self.animate(pageAuthorHide);
	});
	
	var pageAuthorHide = Ti.UI.createAnimation({
		duration: 500,
		opacity: 0.0,
		curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
	});
	
	var animationHandler = function() {
 
	};

	return self;
};

module.exports = PageAuthorView;