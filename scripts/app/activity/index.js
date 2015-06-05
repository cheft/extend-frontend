module.exports = {
    actions: {
        init: function() {
            // this.number = 5;
        },

        ranking: function() {
            app.router.go('ranking');
        },

        invitation: function() {
            app.router.go('invitation');
        },
        
        recommend: function() {
            app.router.go('register');
        }
    },

    events: {
        mount: function() {
            this.number = 2;
            this.update();
        }
    }

}