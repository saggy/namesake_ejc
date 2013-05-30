var win1 = Titanium.UI.createWindow({backgroundColor:'#fff'});
var scrollView = Titanium.UI.createScrollView({
	contentHeight:1500,
	top:0
});
var label = Titanium.UI.createLabel({ color:"black",text:""  });
scrollView.add(label);
win1.add(scrollView);
win1.open();

var db = require("db");

label.text += "************************************\n";
label.text += "** Database Path (dbPath):\n" + db.dbPath + "\n";

function test_db(filename, password)
{

	label.text += "************************************\n";
	label.text += "** database: " + filename + "\n";
	label.text += "** password: " + password + "\n";
	if (password == "DEFAULT")
	{
		label.text += "** using DEFAULT PASSWORD OF:\n";		
		label.text += "** " + Titanium.App.guid + "\n";		
	}
	label.text += "************************************\n";
	
	var maindb = db.openDB(filename, password);
	maindb.execute("create table if not exists people (name TEXT)");
	var rows = maindb.execute("select count(*) as theCount from people");
	var peopleCount = parseInt(rows.fieldByName("theCount"),10); // fieldByName returns strings

	if (peopleCount === 0)
	{
		label.text += "\ninserting records into database...\n";
		maindb.execute("insert into people (name) values ('George Washington')");
		maindb.execute("insert into people (name) values ('John Adams')");
		maindb.execute("insert into people (name) values ('Thomas Jefferson')");
		maindb.execute("insert into people (name) values ('James Madison')");
		maindb.execute("insert into people (name) values ('James Monroe')");
		label.text += "creating full-text index...\n";
		maindb.execute("create virtual table FT USING fts3(name TEXT)");
		maindb.execute("insert into FT (rowid,name) select rowid,name from people");
	}

	var pres = maindb.execute("select name as president from people");
	label.text += "selecting records from database...\n\n";

	while (pres.isValidRow())
	{
		label.text += pres.fieldByName("president") + "\n";
		pres.next();
	}
	pres.close();
	label.text += "\ntesting full-text index:\n\n";
	var srch = maindb.execute("select name,rowid from FT where name match 'james'"); // uses FTS3 index for speed
	while (srch.isValidRow())
	{
		label.text += srch.fieldByName("name") + " found at rowid " + srch.fieldByName("rowid") + "\n";
		srch.next();		
	}
	srch.close();
	maindb.close();
}

test_db("UNENCRYPTED.db", "");
test_db("DEFAULT.db", "DEFAULT");
test_db("FOO.db", "foo");

