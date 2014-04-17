var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('workoutdb', server, {safe: true});

db.open(function(err, db){
	if(!err){
		console.log("Connected to 'workoutdb' database");
		db.collection('workouts', {safe: true}, function(err, collection){
			if(err) {
				console.log("The 'workouts' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});
	}
});

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('Retreiving entry ' + id);
	db.collection('workouts', function(err, collection){
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
		});
	});
};

exports.findAll = function(req, res){
	db.collection('workouts', function(err, collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});
	});
};

exports.addEntry = function(req, res){
	var entry = req.body;
	console.log('Adding entry: ' + JSON.stringify(entry));
	db.collection('workouts', function(err, collection){
		collection.insert(entry, {safe: true}, function(err, result){
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateEntry = function(req, res){
	var id = req.params.id;
	var entry = req.body;
	delete entry._id;
	console.log('Updating entry: ' + id);
	console.log(JSON.stringify(entry));
	db.collection('workouts', function(err, collection){
		collection.update({'_id':new BSON.ObjectID(id)}, entry, {safe:true}, function(err, result){
			if(err){
				console.log('Error updating entry: ' + err);
				res.send({'error': 'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(entry);
			}
		});
	});
};

exports.deleteEntry = function(req, res){
	var id = req.params.id;
	console.log('Deleting entry: ' + id);
	db.collection('workouts', function(err, collection){
		collection.remove({'_id': new BSON.ObjectID(id)}, {safe:true}, function(err, result){
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
};


var populateDB = function() {
	var workouts = [
	{
		title: "Monday",
	},
	{
		title: "Friday Friday Friday",
	}
	];

	db.collection('workouts', function(err, collection){
		collection.insert(workouts, {safe:true}, function(err, result){});
	});
};