var c = require('cheftjs');
c.Adapter = {Promise: $.Deferred, ajax: $.ajax};

window.onload = function() {
    this.app = new c.Application({
        urlRoot      : 'http://10.10.71.125:8080/StruthioCamelus/',
        contentType  : 'application/json',
        container    : 'viewport',
        router       : require('./router')
    });
    app.validate = require('../assets/js/validation');
    app.start();
}
