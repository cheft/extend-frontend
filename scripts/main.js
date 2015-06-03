var c = require('../assets/js/cheft');

// dev
$.get('dist/config.json').done(function(resp) {
    window.app = new c.Application({urlRoot: resp.urlRoot});
    app.mount('viewport');

    app.router = new c.Router(require('./router'));
    app.router.start();
});
