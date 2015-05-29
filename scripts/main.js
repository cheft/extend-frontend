require('./app/viewport/tag');
require('./app/ranking/tag');
require('./app/share/tag');
require('./app/footer/tag');
require('./app/test/tag');

window.app = new Cheft.Application();
app.mount('viewport');

app.router = new Cheft.Router(require('./router'));
app.router.start();
