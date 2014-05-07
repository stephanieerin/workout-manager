var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('workoutdb', server, {safe: true});

db.open(function(err, db){
	if(!err){
		console.log("Connected to 'workoutdb' database");
		db.collection('tags', {safe: true}, function(err, collection){
			if(err) {
				console.log("The 'tags' collection doesn't exist. Creating it with sample data...");
				populateTags();
			}
		});
	}
});

exports.getTags = function(req, res){
	db.collection('tags', function(err, collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});
	});
};

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('Retreiving tag ' + id);
	db.collection('tags', function(err, collection){
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
		});
	});
};

exports.addTag = function(req, res){
	var type = req.body;
	console.log('Adding tag: ' + JSON.stringify(type));
	db.collection('tags', function(err, collection){
		collection.insert(type, {safe: true}, function(err, result){
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.deleteTag = function(req, res){
	var id = req.params.id;
	console.log('Deleting tag: ' + id);
	db.collection('tags', function(err, collection){
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

var populateTags = function() {
	var tags = [
		{
            name: "Kinetic Sprint",
            type: "triathlon"
        },
		{
            name: "Rock Hall International",
            type: "triathlon"
        },
		{
            name: "Ragnar Relay",
            type: "running"
        }
	];

	db.collection("tags", function(err, collection){
		collection.insert(types, {safe:true}, function(err, result){});
	});
};
