module.exports = {
    store: 'ranking',
    actions: {
        back: function() {
            app.router.back();
        }
    },

    events: {
        mount: function() {
            this.loader = $.loading({content:'加载数据'});
            this.store.get();
        },
        geted: function(status, data) {
            if(status === 'success') {
                this.list = data;
                this.update();
                this.loader.loading('hide');
            }
        }
    }
}