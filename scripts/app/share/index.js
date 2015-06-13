module.exports = {
    store: 'activities/landingpage',
    events: {

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
        goStudent: function(e) {
            if(app.isTouchmove(e)) {
                return;
            };
            location.href = app.getUrls('').studentUrl;
        }   
    }
}