window.Workout = Backbone.Model.extend({
	urlRoot: "/workouts",

	idAttribute: "_id",

	initialize: function(){

	},

	defaults: {
		_id: null,
		title: ""
	}
});

window.WorkoutCollection = Backbone.Collection.extend({
	model: Workout,
	url: "/workouts"
});