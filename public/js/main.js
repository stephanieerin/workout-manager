var AppRouter = Backbone.Router.extend({
	routes: {
		'entries' : 'list'
	},

	initialize: function(){
		this.listView = new ListView();
		$('#container').html(this.listView);
	}
});