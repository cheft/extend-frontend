module.exports = {
    store: 'customers/subscribed',
    events: {
        saved: function(data) {
            if(data.status === 'success') {
                $.dialog({
                    content: '已帮他顶成功',
                    button: ['确定']
                });
                this.parent.trigger('openid', this.parent.openid);
            }else if(data.status === 'fail') {
                $.dialog({
                    content: data.data,
                    button: ['确定']
                });
            }
        }
    },
    actions: {
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
        ding: function(e) {
            if(app.isTouchmove(e)) {
                return;
            }
            var self = this;
            var openid = this.parent.openid;
            this.userId = this.parent.store.data.referrer.id;
            this.store.url = 'customers/attr';
            this.store.get().done(function(data) {
                if(data.data.exists) {
                    if(data.data.lovingGuy) {
                        var dia = $.dialog({
                            content: '不可重复帮顶哦，您也可以邀请好友轻松赢肾6',
                            button: ['活动中心', '取消']
                        });
                        dia.on('dialog:action', function(evt){
                            if(evt.index === 0) {
                                self.goActivity();
                            }
                        });
                        return;
                    }else {
                        self.store.url = 'customers/up?referee=' + self.userId;
                        self.store.save({});
                    }
                }else {
                    app.router.go('register/' + openid);
                }
            });
        },
        yao: function(e) {
            if(app.isTouchmove(e)) {
                return;
            }
            var self = this;
            this.store.url = 'customers/attr';
            this.store.get().done(function(data) {
                if(data.data.exists) {
                    self.goActivity();
                }else {
                    app.router.go('register');
                }
            });
        }
    }
};
