window.riot = require('riot');
window.c = require('../assets/js/cheft');

require('./app/viewport/tag');
require('./app/ranking/tag');
require('./app/invitation/tag');
require('./app/share/tag');
require('./app/about/tag');
require('./app/activity/tag');
require('./app/register/tag');
require('./app/expiry/tag');

// dev
$.get('dist/config.json').done(function(resp) {
    window.app = new c.Application({urlRoot: resp.urlRoot});
    app.mount('viewport');

    app.router = new c.Router(require('./router'));
    app.router.start();
});
