module.exports = {
    store: 'wechatapi/jsconfig',
    events: {
        update: function() {
            this.qrcode = app.urlRoot + 'customers/qrcode?v=' + (new Date()).getMilliseconds();
        },

        geted: function(data) {
            this.config(data.data);
            var link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + data.data.appId + '&redirect_uri=http://idcwxtest.dafysz.cn/StruthioCamelus/api/dispatcher/share?referee=' + this.openid + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
            var obj = {
                title: '达飞学生贷，为你而来',
                desc: '推荐有礼，免费领取iPhone6',
                link: link, 
                imgUrl: app.website + 'assets/img/logo.png'
            };
            wx.ready(function(){
                wx.onMenuShareTimeline(obj);
                wx.onMenuShareAppMessage(obj);
                wx.onMenuShareQQ(obj);
                wx.onMenuShareWeibo(obj);
            });
        },
        openid: function(openid) {
            this.openid = openid;
            this.store.params = {href: location.href.split('#')[0]};
            this.store.get();
        }
    },
    actions: {
        goStudent: function() {
            location.href = app.studnetUrl;
        },
        config: function(data) {
            wx.config({
                debug: false, 
                appId: data.appId, 
                timestamp: data.timestamp,
                nonceStr: data.nonceStr, 
                signature: data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQQ']
            });
        }
    }
}
