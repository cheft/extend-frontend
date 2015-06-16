module.exports = {
    store: 'prizes',
  	events: {
        mount: function() {
            this.store.get();
        },
        geted: function(data) {
            app.trigger('geted_prizes', data.data);
        },
		show: function(tag) {
    		this.container.setAttribute('riot-tag', tag);
    		app.mount(tag);
  		}
	}
};
