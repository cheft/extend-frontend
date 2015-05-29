module.exports = {
    routes: {
        '': 'home',
        ':id': 'start'
    },

    start: function(id) {
        app.tags.viewport.show(id);
    },
    home: function() {
        app.tags.viewport.show('ranking');
    }

};
