module.exports = {
    store: 'activities/landingpage',
    events: {
        update: function() {
            this.qrcode = app.urlRoot + 'customers/qrcode?v=' + (new Date()).getMilliseconds();
        },
        geted: function(data) {
            app.container.tags.signature.trigger('share', this.openid, data.data.nextPrize.name);
        },
        openid: function(openid) {
            this.openid = openid;
            this.store.params = {openid: openid};
            this.store.get();
        }
    },
    actions: {
        goStudent: function() {
            location.href = app.getUrls('').studentUrl;
        }   
    }
}