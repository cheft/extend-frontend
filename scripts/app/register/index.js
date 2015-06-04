module.exports = {
    actions: {
        register: function() {
            app.router.go('share');
        },

        ranking: function() {
            app.router.go('ranking');
        },

        getCode: function(e) {
            if(!this.tags.field[4].validate()) {
                return
            }
            var el = $(e.target), time = 10;
            var countdown = function() {
                if (time <= 0) {
                    el.attr('disabled', null).removeClass('c-btn-disabled').html('获取');
                    return;
                }
                el.html('获取(' + (time--) + ')');
                setTimeout(countdown, 1000);
            }
            el.attr('disabled', true).addClass('c-btn-disabled').html('获取(' + (time--) + ')');
            countdown();
            $.tips({content: '验证码已发送', stayTime: 2000, type: 'success'});
        }
    },

    events: {
        mount: function() {
            this.trigger('formValidate');
        },

        formValidate: function() {
            var self = this
            var fields = self.tags.field, keys = {};
            for(var i = 0; i < fields.length; i++) {
                fields[i].on('validate', function(key, value) {
                    keys[key] = value;
                    var count = 0;
                    for(var k in keys) {
                        if(keys[k]) {
                            count++;
                        }
                    }
                    if(count >= fields.length) {
                        $(self.submit).removeClass('c-btn-disabled');
                    }else {
                        $(self.submit).addClass('c-btn-disabled');
                    }
                });
            }
        }
    }
}