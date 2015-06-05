var c = require('cheftjs');

c.Adapter = {Promise: $.Deferred, ajax: $.ajax};

// dev
$.get('dist/config.json').done(function(resp) {
    window.app = new c.Application({urlRoot: resp.urlRoot});
    app.mount('viewport');

    app.router = new c.Router(require('./router'));
    app.router.start();
    app.validate = require('../assets/js/validation');
});
