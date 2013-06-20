function ResponseDialog(_args){
	var question = _args.question;
	var answer = _args.answer;

	var self = Ti.UI.createWindow({
		barColor: '#0096DE',
		title: 'Answer'
	});
	
	var whiteBox = Ti.UI.createView({
		left: 50,
		right: 50,
		top: 50,
		bottom: 50,
		backgroundColor: '#FFFFFF'
	});
	
	self.add(whiteBox);	
		
	var cancel = Ti.UI.createButton({
		title: 'Cancel',
		backgroundColor: 'red'
	});
	
	var done = Ti.UI.createButton({
		title: 'Done',
		style: Ti.UI.iPhone.SystemButtonStyle.Done
	});
	
	var question = Ti.UI.createLabel({
		left: 20,
		right: 20,
		top: 0,
		height: 170,
		text: question,
		color: '#000000',
  		backgroundColor:'#FFFFFF',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	var textField = Ti.UI.createTextField({
		height: 250,
		bottom: 50,
		left: 10,
		right: 10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		value: _args.answer
	});
	
	whiteBox.add(question);
	self.setLeftNavButton(cancel);
	self.setRightNavButton(done);
	whiteBox.add(textField);
	
	done.addEventListener('click', function(e){
		textField.blur();
		
		self.fireEvent('done',{text: textField.getValue()});
		
	});
	cancel.addEventListener('click', function(e){
		textField.blur();
		self.close();
	});
	
	
	
	return self;
}

module.exports = ResponseDialog;