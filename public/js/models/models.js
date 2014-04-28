window.Workout = Backbone.Model.extend({
	urlRoot: "/workouts",

	idAttribute: "_id",

	initialize: function(){

	},

	defaults: {
		_id: null,
		distance: null,
		type: "",
		date: "",
		duration_hour: null,
		duration_minute: null,
		duration_second: null,
		temp: null,
	}
});

window.WorkoutCollection = Backbone.Collection.extend({
	model: Workout,
	url: "/workouts"
});

window.Type = Backbone.Model.extend({
	urlRoot: "/types",

	idAttribute: "_id",

	defaults: {
		_id: null,
		name: ""
	}

});

window.TypeCollection = Backbone.Collection.extend({
	model: Type,
	url: "/types"
});