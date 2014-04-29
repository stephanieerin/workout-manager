window.WorkoutMetricView = Backbone.View.extend({

	template: _.template('<table class="table table-hover table-bordered table-condensed">' +
		'<thead class="headers"></thead>' +
		'<tbody class="workouts"></tbody></table>'),

	events: {
		'click .sort' : 'sortTable'
	},

	aAsc: [],

	initialize: function() {
		this.render();
	},

	render: function() {

		var variables = [
			"Duration",
			"Distance",
			"Type",
			"Date"
		];

		var workouts = this.model.models;
		$(this.el).html(this.template());

		for (var i = variables.length - 1; i >= 0; i--) {
			$('.headers', this.el).append(_.template("<th class='sort'><%= element %></th>", {element: variables[i]}));
		};

		for (var i = workouts.length - 1; i >= 0; i--) {
			$('.workouts', this.el).append(new WorkoutMetricItemView({model: workouts[i]}).render().el);
		};
		
		return this;
	},

	sortTable: function(event){
		var me = this;
		var nr = $(event.currentTarget).index();
		me.aAsc[nr] = me.aAsc[nr]=='asc'?'desc':'asc';
		$('.table>tbody>tr').tsort('td:eq(' + nr + ')', {order: me.aAsc[nr]});
	}

});

window.WorkoutMetricItemView = Backbone.View.extend({

	el: "<tr></tr>",

	template: _.template('<td><a href="#workouts/<%= _id %>"><%= date %></a></td><td><%= type %></td><td><%= distance %></td>'),

	initialize: function(){
		//this.render();
	},

	render: function() {

		var me = this;

		var variables = [
			"duration",
			"distance",
			"type",
			"date"
		];

		var workout = this.model.toJSON();

		for (var i = variables.length - 1; i >= 0; i--) {
			var variable = variables[i];
			var value = workout[variable];
			if(variable === "date"){
				$(this.el).append(_.template('<td><a href="#workouts/<%= _id %>"><%= value %></a></td>', {value: value, _id: workout._id}));
			} else {
				$(this.el).append(_.template("<td><%= value %></td>", {value: value}));
			}

		};

		//$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});