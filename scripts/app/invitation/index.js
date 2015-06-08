module.exports = {
    store: 'ranking',
    actions: {
        back: function() {
            app.router.back();
        },
        create: function() {
            this.store.save({phone: '1234', number: '2'});
        },
        remove: function(e) {
            this.store.del({id: e.item.id});
        },
        edit: function(e) {
            this.store.save({id: e.item.id, number: '49'});
        }
    },
    events: {
        init: function() {
           console.log(this, this.opts); 
        },
        mount: function() {
            this.trigger('get');
        },
        get: function() {
            this.loader = $.loading({content:'加载数据'});
            this.store.get();
        },
        geted: function() {
            this.update();
            this.loader.loading('hide');
        },
        saved: function() {
            this.trigger('get');
        },
        deleted: function() {
            this.trigger('get');
        }   
    }
}