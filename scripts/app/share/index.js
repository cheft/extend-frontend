module.exports = {
    store: 'activities/landingpage',
    events: {
        update: function() {
            this.qrcode = app.urlRoot + 'customers/qrcode?v=' + (new Date()).getMilliseconds();
        },
        geted: function(data) {
            var link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app.signature.appId + '&redirect_uri=http://idcwxtest.dafysz.cn/StruthioCamelus/api/dispatcher/share?referee=' + openid + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
            var obj = {
                title: '达飞学生贷，为你而来',
                desc: '够朋友就帮忙顶下，我能拿' + data.data.nextPrize.name + '了，你也可以试试！',
                link: link, 
                imgUrl: app.website + 'assets/img/share-icon.jpg'
            };
            wx.ready(function(){
                wx.onMenuShareTimeline(obj);
                wx.onMenuShareAppMessage(obj);
                wx.onMenuShareQQ(obj);
                wx.onMenuShareWeibo(obj);
            });
        },
        openid: function(openid) {
            this.store.params = {openid: openid};
            this.store.get();
        }
    },
    actions: {
        goStudent: function() {
            location.href = app.studnetUrl;
        }   
    }
}
