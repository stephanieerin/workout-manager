window.ListView = Backbone.View.extend({

	initialize: function(){
		this.render();
	},

	render: function(){
		var entries = this.model.models;
		$(this.el).html('<ul class="entries"></ul>');

		for (var i = entries.length - 1; i >= 0; i--) {
			$('.entries', this.el).append(new EntryListItemView({model: entries[i]}).render().el);
		};

		return this;
	}
});

window EntryListItemView = Backbone.View.extend({

	itemTpl = Handlebars.compile(
		'<li>{{title}}</li>'
	),

	initialize: function(){

	},

	render: function(){
		this.el.html(itemTpl(model));
	}
});