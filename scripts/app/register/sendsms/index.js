module.exports = {
    store: 'sms',
    events: {
        geted: function(data) {
            if(data.status == 'success') {
                return $.tips({content: '验证码已发送', stayTime: 2000, type: 'success'});
            }
            app.error(data);
        }
    },
    actions: {
        getCode: function(e) {
            if(app.isTouchmove(e)) {
                return;
            };
            var regTag = this.parent.parent;
            if(!regTag.tags.mobile.validate()) {
                return;
            }
            var el = $(e.target), time = 60;
            var countdown = function() {
                if (time <= 0) {
                    el.attr('disabled', null).html('获取');
                    return;
                }
                el.html('获取(' + (time--) + ')');
                setTimeout(countdown, 1000);
            }
            el.attr('disabled', true).html('获取(' + (time--) + ')');
            countdown();
            this.store.url = 'sms/' + regTag.tags.mobile.el.value;
            this.store.get();
        },
    }
}