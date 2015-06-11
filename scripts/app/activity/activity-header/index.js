module.exports = {
    store: 'customers/attr',
    events: {
        init: function() {
            this.store.get()
        },
        geted: function(data) {
            if(!data.data.exists) {
                app.router.go('register');
            }
        }
    }
}