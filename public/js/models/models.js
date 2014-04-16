window.Entry = Backbone.Model.extend({
	urlRoot: "/entries",

	idAttribute: "_id",

	initialize: function(){

	},

	defaults: {
		_id: null,
		title: ""
	}
});

window.EntryCollection = Backbone.Collection.extend({
	model.Entry,
	url: "/entries"
});