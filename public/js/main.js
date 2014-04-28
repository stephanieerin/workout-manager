var AppRouter = Backbone.Router.extend({

	routes: {
		"workouts/add" : "addWorkout",
		"workouts" : "list",
		"workouts/:id" : "viewWorkout",
		"metrics" : "viewMetrics"
	},

	initialize: function() {
		this.header = new HeaderView();
		$('#header').html(this.header.el);
	},

	list: function(){
		var workoutList = new WorkoutCollection();
		workoutList.fetch({success: function() {
			$('#container').html(new WorkoutListView({model: workoutList}).el);
		}});
	},

	addWorkout: function(){
		var workout = new Workout();
		var types = new TypeCollection();
		types.fetch({success: function(){
			$('#container').html(new WorkoutView({model: workout, collection: types}).el);
		}});
	},

	viewWorkout: function(id){
		var workout = new Workout({_id: id});
		var types = new TypeCollection();
		types.fetch({success: function() {
			workout.fetch({success: function(){
			$('#container').html(new WorkoutView({model: workout, collection: types}).el);
			}});
		}});

	},

	viewMetrics: function(){
		var workoutList = new WorkoutCollection();
		workoutList.fetch({success: function(){
			$('#container').html(new WorkoutMetricView({model: workoutList}).el);
		}});
	}
});

app = new AppRouter();
Backbone.history.start();

