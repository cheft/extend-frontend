module.exports = {
    store: 'customers/attr',
    events: {
        mount: function() {
            this.store.get()
        },
        geted: function(data) {
            if(!data.data.exists) {
                app.router.go('register');
            }else {
                app.router.go('activity');
            }
        }
    }
}