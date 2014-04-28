window.WorkoutView = Backbone.View.extend({

	template: _.template(
		'<h1><% if(_id != null){print("Edit");} else {print("Add a");}%> Workout</h1>'+
		'<form role="form" id="workout">'+
			'<div class="form-group">'+
				'<label for="distance">Distance</label>'+
				'<input class="form-control" id="distance" name="distance" type="number" value="<%= distance %>" />'+
			'</div>'+
			'<div class="form-group">'+
				'<label for="date">Date</label>'+
				'<input class="form-control" id="date" name="date" type="text" value="<%= date %>" />'+
			'</div>'+
			'<div class="form-group">' + 
				'<label for="type">Type</label>' +
				'<select class="form-control choices" name="type"></select>' + 
			'</div>' +
			'<div class="form-group">'+
				'<label for="duration">Duration</label>'+
				'<input class="form-control" id="duration_hour" name="duration_hour" type="number" value="<%= duration_hour %>" />'+
				'<input class="form-control" id="duration_minute" name="duration_minute" type="number" value="<%= duration_minute %>" />'+
				'<input class="form-control" id="duration_second" name="duration_second" type="number" value="<%= duration_second %>" />'+
			'</div>'+
			'<a href="#" class="btn btn-primary save">Save</a>'+
			'<a href="#" class="btn btn-default delete">Delete</a>'+
		'</form>'
	),

	initialize: function(){
		this.render();
	},

	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));

		if(this.collection){
			for (var i = this.collection.models.length - 1; i >= 0; i--) {
				$('.choices', this.el).append(new TypeListView({model: this.collection.models[i]}).render().el);
			}
		}

		$('.choices option:contains(' + this.model.toJSON().type + ')', this.el).prop('selected', true);

		if(!this.model.toJSON().date){
			$('#date', this.el).datepicker('setDate', new Date());
			$('#date', this.el).datepicker('update');
		}


		return this;
	},

	events: {
		"click .save" : "saveWorkout",
		"click .delete" : "deleteWorkout",
		"change" : "change"
	},

	change: function(event){
		var target = event.target;
		var change = {};
		change[target.name] = (target.name === "distance")? parseFloat(target.value): target.value;
		this.model.set(change);
	},

	saveWorkout: function(){
		var me = this;

		this.model.save(null, {
			success: function(model){
				console.log("saved!");
				me.render();
				app.navigate('workouts', true);
			}
		})
	},

	deleteWorkout: function(){
		this.model.destroy({
			success: function() {
				window.history.back();
			},
			error: function() {
				console.log("error deleting workout");
			}
		});
		return false;
	},

	renderTypes: function() {

	}
});


window.TypeListView = Backbone.View.extend({
	el: '<option></option>',

	template: _.template('<%= name %>'),

	initialize: function() {

	},

	render: function() {
		$(this.el).append(this.template(this.model.toJSON()));
		return this;
	}

});