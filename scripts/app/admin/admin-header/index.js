module.exports = {
    store: 'salesman',
    events: {
        mount: function() {
            this.store.get();
        },
        geted: function(data) {
            if(!data.data) {
                var dia = $.dialog({
                    content: '您没有兑奖权限，请联系管理员获取权限！',
                    button: ['关闭页面']
                });
                dia.on('dialog:action',function(e){
                    if(typeof WeixinJSBridge  == 'undefined') {
                        history.back();
                    }else {
                        WeixinJSBridge.call('closeWindow');
                    }
                });
            }
        }
    }
}