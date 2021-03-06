module.exports = {
    routes: {
        '': 'home',
        ':id': 'start',
        ':id/:openid': 'goByOpenId',
        'register/:openid': 'ding',
        'share/:openid': 'share'
    },

    start: function(id) {
        app.container.trigger('show', id);
    },

    home: function() {
        app.container.trigger('show', 'main');
    },

    goByOpenId: function(id, openid) {
        app.container.trigger('show', id);
        app.currentTag.trigger('openid', openid);
    },

    ding: function(openid) {
        app.container.trigger('show', 'register');
        app.currentTag.trigger('openid', openid);
    },

    share: function(openid) {
        app.container.trigger('show', 'share');
        app.currentTag.trigger('openid', openid);
    }
};
