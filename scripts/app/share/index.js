module.exports = {
    store: 'wechatapi/jsconfig',
    events: {
        update: function() {
            this.qrcode = app.urlRoot + 'customers/qrcode';
        },

        geted: function(data) {
            this.config(data.data);
            var link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + data.data.appId + '&redirect_uri=http://idcwxtest.dafysz.cn/StruthioCamelus/api/dispatcher/share?referee=' + this.openid + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
            wx.onMenuShareAppMessage({
                title: '达飞学生贷，为你而来', // 分享标题
                desc: '达飞学生贷，为你而来', // 分享描述
                link: link, // 分享链接
                imgUrl: app.urlRoot + 'customers/qrcode', // 分享图标
                // type: '', // 分享类型,music、video或link，不填默认为link
                // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () { 
                    // 用户确认分享后执行的回调函数
                    alert('success');
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                    alert('cancel');
                }
            });
        },
        openid: function(openid) {
            this.openid = openid;
            this.store.get();
        }
    },
    actions: {
        goStudent: function() {
            location.href = app.studnetUrl;
        },
        config: function(data) {
            alert(JSON.stringify(data));
            wx.config({
                debug: true, 
                appId: data.appId, 
                timestamp: data.timestamp,
                nonceStr: data.nonceStr, 
                signature: data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQQ']
            });
        }
    }
}
