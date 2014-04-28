window.WorkoutMetricView = Backbone.View.extend({

	template: _.template('<table class="table table-hover">' +
		'<thead class="headers"></thead>' +
		'<tbody class="workouts"></tbody></table>'),

	initialize: function() {
		this.render();
	},

	render: function() {

		var variables = [
			"Distance",
			"Type",
			"Date",
			"ID"
		];

		var workouts = this.model.models;
		$(this.el).html(this.template());

		for (var i = variables.length - 1; i >= 0; i--) {
			$('.headers', this.el).append(_.template("<th><%= element %></th>", {element: variables[i]}));
		};

		for (var i = workouts.length - 1; i >= 0; i--) {
			$('.workouts', this.el).append(new WorkoutMetricItemView({model: workouts[i]}).render().el);
		};
		
		return this;
	}

});

window.WorkoutMetricItemView = Backbone.View.extend({

	el: "<tr></tr>",

	template: _.template("<td><%= _id %></td><td><%= date %></td><td><%= type %></td><td><%= distance %></td>"),

	initialize: function(){
		//this.render();
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});