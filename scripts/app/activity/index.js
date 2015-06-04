module.exports = {
    actions: {
        ranking: function() {
            app.router.go('ranking');
        },

        invitation: function() {
            app.router.go('invitation');
        },
        
        recommend: function() {
            app.router.go('register');
        }
    }
}