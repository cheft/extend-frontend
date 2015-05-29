module.exports = {
    routes: {
        '': 'home',
        ':id': 'start'
    },

    start: function(id) {
        app.tags.viewport.trigger('show', id);
    },
    home: function() {
        app.tags.viewport.trigger('show', 'ranking');
    }

};
