window.WorkoutListView = Backbone.View.extend({

	initialize: function(){
		this.render();
	},

	render: function(){
		var workouts = this.model.models;
		$(this.el).html('<ul class="workouts"></ul>');

		for (var i = workouts.length - 1; i >= 0; i--) {
			$('.workouts', this.el).append(new WorkoutListItemView({model: workouts[i]}).render().el);
		}

		return this;
	}
});

window.WorkoutListItemView = Backbone.View.extend({

	template: _.template('<a href="#workouts/<%= _id %>"><%= distance %></a>'),

	initialize: function(){

	},

	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});