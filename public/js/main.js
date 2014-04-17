var AppRouter = Backbone.Router.extend({

	routes: {
		//"workouts/:id": viewEntry
		"workouts/add" : "addWorkout",
		"workouts" : "list",
		"workouts/:id" : "viewWorkout",
		"workouts/metrics" : "viewMetrics"
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
		$('#container').html(new WorkoutView({model: workout}).el);
	},

	viewWorkout: function(id){
		var workout = new Workout({_id: id});
		workout.fetch({success: function(){
			$('#container').html(new WorkoutView({model: workout}).el);
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

