module.exports = {
    store: 'customers/attr',
    events: {
        mount: function() {
            this.getData();
        },
        geted: function(data) {
            this.store.data = data.data;
        },
        saved: function() {
            $.dialog({
                content: '已帮他顶成功',
                button: ['确定']
            });
            this.getData();
            this.parent.trigger('openid', this.parent.openid);
        }
    },
    actions: {
        getData: function() {
            this.store.url = 'customers/attr';
            this.store.get();
        },
        ding: function() {
            var openid = this.parent.openid;
            this.userId = this.parent.store.data.referrer.id;
            if(this.store.data.lovingGuy) {
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
            }else if(this.store.data.exists) {
                this.store.url = 'customers/up?referee=' + this.userId;
                this.store.save({});
            }else {
                app.router.go('register/' + openid);
            }
        },
        yao: function() {
            if(this.store.data.exists) {
                return app.router.go('activity');
            }
            return app.router.go('register');
        }
    }
}