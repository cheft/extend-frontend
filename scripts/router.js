module.exports = {
    routes: {
        '': 'home',
        ':id': 'start',
        ':id/:openid': 'goByOpenId',
        'register/:openid': 'ding'
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
    }
};
