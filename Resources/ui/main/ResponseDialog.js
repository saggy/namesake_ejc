function ResponseDialog(_args){
	var question = _args.question;
	var answer = _args.answer;

	var self = Ti.UI.createView({
		height: 350,
		width: 535,
		backgroundColor: '#FFFFFF',
		modal: true
	})
	
	var cancel = Ti.UI.createButton({
		top: 300,
		left: 450,
		title: 'Cancel',
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var done = Ti.UI.createButton({
		top: 300,
		left: 375,
		title: 'Done',
		style: Ti.UI.iPhone.SystemButtonStyle.Done
	});
	
	var title = Ti.UI.createLabel({
		height: 50,
		width: 550,
		top: 0,
		text: 'Answer',
		color: '#FFFFFF',
  		backgroundColor:'#0096DE',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	var question = Ti.UI.createLabel({
		height: 50,
		width: 550,
		top: 50,
		text: question,
		color: '#000000',
  		backgroundColor:'#FFFFFF',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	var textField = Ti.UI.createTextField({
		height: 125,
		width: 450,
		top: 125,
		left: 50,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		value: answer
	});
	
	self.add(title);
	self.add(question);
	self.add(cancel);
	self.add(done);
	self.add(textField);
	
	done.addEventListener('click', function(e){
		textField.blur();
		self.hide();
		
		self.fireEvent('done',{text: textField.getValue()});
		
	});
	cancel.addEventListener('click', function(e){
		textField.blur();
		self.hide();
	});
	return self;
}

module.exports = ResponseDialog;