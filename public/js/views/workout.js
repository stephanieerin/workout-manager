window.WorkoutView = Backbone.View.extend({

	template: _.template(
		'<h1><% if(_id != null){print("Edit");} else {print("Add a");}%> Workout</h1>'+
		'<form role="form" id="workout">'+
			'<div class="form-group">'+
				'<label for="title">Title</label>'+
				'<input class="form-control" id="title" name="title" type="text" value="<%= title %>" placeholder="Title" />'+
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
		change[target.name] = target.value;
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
	}
})