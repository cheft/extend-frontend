module.exports = {
    store: 'customers/isregister',
    actions: {
        ding: function() {
            var openid = this.parent.openid;
            this.store.url = 'customers/associated';
            this.store.get().done(function(data) {
                if(data.data && data.data.associated) {
                    var dia = $.dialog({
                        content: '同一用户不可重复帮顶哦，您也可以邀请好友轻松赢肾6',
                        button: ['活动中心','取消']
                    });
                    dia.on('dialog:action',function(e){
                        if(e.index === 0) {
                            app.router.go('activity');
                        }
                    });
                    return;
                }
                app.router.go('register/' + openid);
            });
        },
        yao: function() {
            this.store.url = 'customers/isregister';
            this.store.get().done(function(data) {
                if(data.data) {
                    return app.router.go('activity');
                }
                app.router.go('register');
            });
        }
    }
}