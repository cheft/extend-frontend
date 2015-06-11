module.exports = {
    store: 'activities/recommendedDetails',
    events: {
        mount: function() {
            this.store.get();
        },
        geted: function(data) {
            this.list = data.data;
            this.update();
        }
    },
    actions: {
        back: function() {
            app.router.back();
        }
    }
}