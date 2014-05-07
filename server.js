var express = require('express'),
	path = require('path'),
	http = require('http'),
	entry = require('./routes/workouts'),
    type = require('./routes/types'),
    tag = require('./routes/tags');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/workouts', entry.findAll);
app.get('/workouts/:id', entry.findById);
app.post('/workouts', entry.addEntry);
app.put('/workouts/:id', entry.updateEntry);
app.delete('/workouts/:id', entry.deleteEntry);

app.get('/types', type.getTypes);
app.post('/types', type.addType);
app.delete('/types/:id', type.deleteType);
app.get('/types', type.findById);

app.get('/tags', tag.getTags);
app.post('/tags', tag.addTag);
app.delete('/tags/:id', tag.deleteTag);
app.get('/tags/:id', tag.findById);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
