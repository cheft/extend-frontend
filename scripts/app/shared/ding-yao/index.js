module.exports = {
    store: 'customers/subscribed',
    events: {
        mount: function() {
            this.getData();
        },
        saved: function(data) {
            if(data.status == 'success') {
                $.dialog({
                    content: '已帮他顶成功',
                    button: ['确定']
                });
                this.getData();
                this.parent.trigger('openid', this.parent.openid);
            }else if(data.status == 'fail') {
                $.dialog({
                    content: data.data,
                    button: ['确定']
                });
            }
        }
    },
    actions: {
        getData: function() {
            self = this;
            this.store.url = 'customers/attr';
            this.store.get().done(function(data) {
                self.exists = data.data.exists;
                self.lovingGuy = data.data.lovingGuy;
            });
        },
        goActivity: function() {
            this.store.url = 'customers/subscribed';
            this.store.get().done(function(data) {
                if(data.data) {
                    self.concerned = data.data;
                    app.router.go('activity');
                }else {
                    location.href = app.getUrls('').concernedUrl;
                }
            });
        },
        ding: function() {
            self = this;
            var openid = this.parent.openid;
            this.userId = this.parent.store.data.referrer.id;
            if(this.lovingGuy) {
                var dia = $.dialog({
                    content: '不可重复帮顶哦，您也可以邀请好友轻松赢肾6',
                    button: ['活动中心','取消']
                });
                dia.on('dialog:action',function(e){
                    if(e.index === 0) {
                        this.goActivity();
                    }
                });
                return;
            }else if(this.exists) {
                this.store.url = 'customers/up?referee=' + this.userId;
                this.store.save({});
            }else {
                app.router.go('register/' + openid);
            }
        },
        yao: function() {
            if(this.exists) {
                this.goActivity();
            }else {
                app.router.go('register');
            }
        }
    }
}