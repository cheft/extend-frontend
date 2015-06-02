module.exports = {
    stores: {
        ranking: {}
    },
    
    actions: {
        back: function() {
            app.router.back();
        }
    },

    events: {
        mount: function() {
            self = this;
            var l = $.loading({
                content:'加载数据',
            });
            this.ranking.get().done(function() {
                self.update();
                l.loading('hide');
            });
        } 
    }
}