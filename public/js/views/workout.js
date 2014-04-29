window.WorkoutView = Backbone.View.extend({

	template: _.template(
		'<div class="page-header"><h1><% if(_id != null){print("Edit");} else {print("Add a");}%> Workout</h1></div>'+
		'<form role="form" id="workout">'+
		'<div class="col-lg-6">' +
			'<div class="form-group input-group">'+
				'<input class="form-control" id="distance" name="distance" type="number" value="<%= distance %>" placeholder="Distance" />'+
				'<span class="input-group-addon">miles</span>'+
			'</div>'+
			'<div class="form-group input-group date">'+
				'<input class="form-control" id="date" name="date" type="text" data-date-format="mm/dd/yyyy" value="<%= date %>" />'+
				'<span class="input-group-addon glyphicon glyphicon-calendar"></span>'+
			'</div>'+
			'<div class="form-group input-group">' + 
				'<span class="input-group-addon">Type</span>'+
				'<select class="form-control choices" name="type"></select>' + 
			'</div>' +
			'<div class="form-group input-group">'+
				'<span class="input-group-addon">Duration</span>'+
				'<input class="form-control" id="duration" name="duration" type="text" value="<%= duration %>" pattern="[1-9]{2}:[1-9]{2}:[1-9]{2}" placeholder="--:--:--"/>'+
				'</div>'+
			'</div>'+
			'<div class="col-lg-6">' +
				'<div class="input-group form-group">'+
					'<input class="form-control" id="pace" name="pace" type="number" value="<%= pace %>" placeholder="Pace" />'+
					'<span class="input-group-addon">min/mile</span>'+
				'</div>'+
				'<div class="form-group input-group">'+
					'<input class="form-control" id="hr" name="hr" type="text" value="<%= hr %>" placeholder="Average HR"/>'+
					'<span class="input-group-addon glyphicon glyphicon-heart"></span>'+
				'</div>'+
				'<div class="form-group input-group">'+
					'<input class="form-control" id="temp" name="temp" type="text" value="<%= temp %>" placeholder="Temperature" />'+
					'<span class="input-group-addon">&deg;F</span>'+
				'</div>'+
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
			$('.date', this.el).datepicker('setDate', new Date());
			$('.date', this.el).datepicker('update');
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

		if(target.name === "distance" || target.name === "duration"){
			this.calcPace();
		}

		
	},

	calcPace: function(){
		var currentModel = this.model.toJSON();
		var change = {};
		if(currentModel.distance && currentModel.duration){
			var duration = currentModel.duration.split(':');
			var time = parseInt(parseInt(duration[0]) * 60) + parseInt(duration[1]) + parseFloat(parseInt(duration[2]) / 60);
			var pace = parseFloat(time/currentModel.distance);
			change["pace"] = pace.toFixed(2);
			$('#pace').val(pace.toFixed(2));
			this.model.set(change);
		}
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