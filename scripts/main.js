var c = require('cheftjs');
c.Adapter = {Promise: $.Deferred, ajax: $.ajax};

window.onload = function() {
    this.app = new c.Application({
        urlRoot      : 'api/',
        contentType  : 'application/json',
        container    : 'viewport',
        router       : require('./router')
    });
    app.studnetUrl = 'http://idcwxtest.dafysz.cn/student-credit/chooseItem';
    app.website = 'http://idcwxtest.dafysz.cn/StruthioCamelus/';
    app.validate = require('../assets/js/validation');

    app.error = function(data) {
        var msg = '系统错误';
        if(data.data && data.data.message) {
            msg = data.data.message;
        }
        var el = $.tips({content: msg, stayTime: 2000, type: 'warn'});
        el.on('touchstart', function() {
            el.tips('hide');
        });
    }

    app.start();
}
