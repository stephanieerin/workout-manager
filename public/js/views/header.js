window.HeaderView = Backbone.View.extend({

	template: _.template(
		'<a href="#workouts" class="btn btn-primary">List</a>' +
		'<a href="#workouts/add" class="btn btn-primary">Add</a>'+
		'<a href="#metrics" class="btn btn-primary">Metrics</a>'
		),


	initialize: function(){
		this.render();
	},

	render: function(){
		$(this.el).html(this.template());
		return this;
	}

});