module.exports = {
    store: 'customers/attr',
    events: {
        mount: function() {
            this.store.get()
        },
        geted: function(data) {
            if(!data.data.exists) {
                app.container.trigger('show', 'register');
            }else {
                app.container.trigger('show', 'activity');
            }
        }
    }
}