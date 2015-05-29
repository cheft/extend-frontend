window.riot = require('riot');
window.c = require('../assets/js/cheft');

require('./app/viewport/tag');
require('./app/ranking/tag');
require('./app/share/tag');
require('./app/footer/tag');
require('./app/test/tag');

window.app = new c.Application();
app.mount('viewport');

app.router = new c.Router(require('./router'));
app.router.start();
