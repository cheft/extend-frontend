module.exports = {
	// :TODO
	store: '',

	actions: {

	},

  	events: {
		show: function(tag) {
    		this.container.setAttribute('riot-tag', tag);
    		app.mount(tag);
  		}
	}
};
