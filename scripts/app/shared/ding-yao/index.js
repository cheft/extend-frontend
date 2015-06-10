module.exports = {
    store: 'customers/isregister',
    actions: {
        common: function(content) {
            var defer = $.Deferred();
            this.store.get().done(function(data) {
                if(data.data) {
                    var dia = $.dialog({
                        title: '提示',
                        content: content,
                        button: ['我的活动中心','取消']
                    });
                    dia.on('dialog:action',function(e){
                        if(e.index === 0) {
                            app.router.go('activity');
                        }
                    });
                    return defer.reject();
                }
                return defer.resovle();
                
            });
            return defer.promise();
        },
        ding: function() {
            var openid = this.parent.openid;
            this.common('您已经注册过，不能再帮别人顶了！').done(function() {
                app.router.go('register/' + openid);
            });
            
        },
        yao: function() {
            this.common('您已经注册过，请点击我的活动中心！').done(function() {
                app.router.go('register/' + openid);
            });
        }
    }
}