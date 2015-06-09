module.exports = {
    store: 'activities/myactivitypage',

    events: {
        mount: function() {
            this.store.get()
        },
        geted: function(data) {
            this.store.data = data.data;
            console.log(data);
            this.update();
        }
    },

    actions: {
        ranking: function() {
            app.router.go('ranking');
        },

        invitation: function() {
            app.router.go('invitation');
        },
        
        recommend: function() {
            app.router.go('share');
        }
    }
}