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

exports.totalDistance = function(req, res){
	
	console.log('Aggregating totals');
	db.collection('workouts', function(err, collection){
		collection.aggregate([
		{
			$group: {
				$sum: "$distance"
			}
		}
			]);
	});
};