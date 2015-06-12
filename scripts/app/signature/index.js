module.exports = {
    store: 'wechatapi/jsconfig',
    events: {
        geted: function(data) {
            app.signature = data.data;
            wx.config({
                debug: false, 
                appId: data.appId, 
                timestamp: data.timestamp,
                nonceStr: data.nonceStr, 
                signature: data.signature,
                jsApiList: ['hideOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQQ']
            });
            wx.ready(function(){
                wx.hideOptionMenu();
            });
        },
        mount: function(openid) {
            this.store.params = {href: location.href.split('#')[0]};
            this.store.get();
        }
    }
};
