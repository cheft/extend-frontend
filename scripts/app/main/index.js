module.exports = {
    store: 'customers/isregister',
    events: {
        mount: function() {
            this.store.get()
        },
        geted: function(data) {
            if(data.data) {
                return app.router.go('activity');
            }
            return app.router.go('register');
        }
    }
}