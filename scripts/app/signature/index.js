module.exports = {
    store: 'wechatapi/jsconfig',
    events: {
        geted: function(data) {
            if(!data.data.appId) {
                return;
            }
            app.signature = data.data;
            wx.config({
                debug: false, 
                appId: data.data.appId, 
                timestamp: data.data.timestamp,
                nonceStr: data.data.nonceStr, 
                signature: data.data.signature,
                jsApiList: ['closeWindow', 'hideOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQQ']
            });
            this.trigger('share');
        },
        share: function(openid, prize) {
            var obj = {};
            var urls = app.getUrls(openid);
            if(openid) {
                obj = {
                    title: '达飞学生贷，为你而来',
                    desc: '够朋友就帮忙顶下，我能拿' + prize + '了，你也可以试试！',
                    link: urls.shareHasOpenid, 
                    imgUrl: app.website + 'assets/img/share-icon.jpg'
                };
            }else {
                obj = {
                    title: '达飞学生贷，为你而来',
                    desc: '达飞学生贷席卷省城，推荐有礼，据说注册享好礼，推荐送肾6。我已注册，你也来试试？',
                    link: urls.shareNoOpenid, 
                    imgUrl: app.website + 'assets/img/share-icon.jpg'
                };
            }
            wx.ready(function() {
                wx.onMenuShareAppMessage(obj);
                wx.onMenuShareQQ(obj);
                wx.onMenuShareWeibo(obj);
                wx.onMenuShareTimeline({
                    title: obj.title + '；' + obj.desc,
                    link: obj.link,
                    imgUrl: obj.imgUrl
                });

                // wx.closeWindow();
            })
        },
        mount: function() {
            var href = location.href.split('#')[0];
            this.store.params = {href: href};
            this.store.get();

            app.website = href;
        }
    }
};
