window.riot = require('riot');
window.c = require('../assets/js/cheft');

require('./app/viewport/tag');
require('./app/ranking/tag');
require('./app/invitation/tag');
require('./app/share/tag');
require('./app/footer/tag');
require('./app/activity/tag');

window.app = new c.Application({urlRoot: 'http://10.10.51.118:3000/'});
app.mount('viewport');

app.router = new c.Router(require('./router'));
app.router.start();
