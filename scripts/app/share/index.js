module.exports = {
    store: 'wechatapi/jsconfig',
    events: {
        mount: function() {
            this.store.get()
        },

        update: function() {
            this.qrcode = app.urlRoot + 'customers/qrcode';
        },

        geted: function(data) {
            console.log(data);
        }
    }
}