module.exports = {
    stores: {
        ranking: {}
    },

    events: {
        mount: function() {
            self = this;
            this.ranking.get().done(function(data) {
                self.list = data;
                self.update();
            });
        } 
    }
}