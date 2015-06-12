var c = require('cheftjs');
c.Adapter = {Promise: $.Deferred, ajax: $.ajax};

window.onload = function() {
    this.app = new c.Application({
        urlRoot      : 'api/',
        contentType  : 'application/json',
        container    : 'viewport',
        router       : require('./router')
    });
    
    app.validate = require('../assets/js/validation');

    app.error = function(data) {
        var msg = '系统错误';
        if(data.data) {
            msg = data.data
        }
        var el = $.tips({content: msg, stayTime: 2000, type: 'warn'});
        el.on('touchstart', function() {
            el.tips('hide');
        });
    }

    app.on('ajax', function(config) {
        if(app.loader) {
            app.loader.loading('hide');
        }
        app.loader = $.loading({content:''});
    });

    app.on('ajaxed', function(config) {
        app.loader.loading('hide');
    });

    app.getUrls = function(openid) {
        return {
            shareHasOpenid: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app.signature.appId + '&redirect_uri=http://idcwxtest.dafysz.cn/StruthioCamelus/api/dispatcher/share?referee=' + openid  + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect',
            shareNoOpenid: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app.signature.appId + '&redirect_uri=' + 'http://idcwxtest.dafysz.cn/StruthioCamelus/api/dispatcher/index&response_type=code&scope=snsapi_base&state=1#wechat_redirect',
            studentUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app.signature.appId + '&redirect_uri=http://idcwxtest.dafysz.cn/student-credit/chooseItem&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect',
            concernedUrl: 'http://mp.weixin.qq.com/s?__biz=MzAxNzE3MDU3MA==&mid=206424861&idx=1&sn=473a356cdc76e578abe70554f8017d20#rd'
        }
    }

    app.start();
}
