var express = require('express'),
	path = require('path'),
	http = require('http'),
	entry = require('./routes/workouts'),
	metrics = require('./routes/metrics');

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

app.get('/metrics', metrics.totalDistance);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});