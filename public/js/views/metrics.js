window.WorkoutMetricView = Backbone.View.extend({

	template: _.template('<p>Hello world!</p>'),

	initialize: function() {
		this.render();
	},

	render: function() {
		var workouts = this.model.models;
		console.log(this.model);
		
		return this;
	}


});