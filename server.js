var express = require('express'),
	path = require('path'),
	http = require('http'),
	entry = require('./routes/entries');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/entries', entry.findAll);
app.get('/entries/:id', entry.findById);
app.post('/entries', entry.addEntry);
app.put('/entries/:id', entry.updateEntry);
app.delete('/entries/:id', entry.deleteEntry);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});