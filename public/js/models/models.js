window.Workout = Backbone.Model.extend({
	urlRoot: "/workouts",

	idAttribute: "_id",

	initialize: function(){

	},

	defaults: {
		_id: null,
		distance: null,
		type: "hike",
		date: "",
		duration: null,
		temp: null,
		hr: null,
		pace: null,
		calories: null
	},

	validate: function(attrs, options) {
		if(!attrs.distance){
			return "Must provide distance";
		}

		if(attrs.date === ""){
			return "Must provide date";
		}

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