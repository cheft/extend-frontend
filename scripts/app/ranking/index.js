module.exports = {
    store: 'activities/rankinglist',
    events: {
        mount: function() {
            // this.loader = $.loading({content:'加载数据'});
            this.store.get();
        },
        geted: function(data) {
            this.list = data.data;
            this.update();
            // this.loader.loading('hide');
        }
    },
    actions: {
        back: function() {
            app.router.back();
        }
    }
}