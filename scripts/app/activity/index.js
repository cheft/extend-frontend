module.exports = {
    actions: {
        goRanking: function() {
            app.router.go('ranking');
        },
        goInvitation: function() {
            app.router.go('invitation');
        }
    }
}