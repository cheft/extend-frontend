module.exports = {
    actions: {
        register: function() {
            var data = {};
            this.fieldEach(function(name, field) {
                data[name] = field.el.value;
            });
            console.log(data);
            // app.router.go('share');
        },

        ranking: function() {
            app.router.go('ranking');
        },

        getCode: function(e) {
            if(e.target.disabled || !this.tags.phone.validate()) {
                return;
            }
            var el = $(e.target), time = 60;
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
        },

        fieldEach: function(cb) {
            var inputs = ['name', 'idcard', 'school', 'professional', 'phone', 'code'];
            for(var i = 0; i < inputs.length; i++) {
                cb(inputs[i], this.tags[inputs[i]]);
            }
        }
    },

    events: {
        mount: function() {
            this.trigger('formValidate');
        },

        checkSubmit: function(keys, key, value, length) {
            keys[key] = value;
            var count = 0;
            for(var k in keys) {
                if(keys[k]) {
                    count++;
                }
            }
            if(count >= 6) {
                $(this.submit).removeClass('c-btn-disabled');
            }else {
                $(this.submit).addClass('c-btn-disabled');
            }
        },

        formValidate: function() {
            var keys = {};
            this.fieldEach(function(name, field) {
                field.on('validate', function(key, value) {
                    this.trigger('checkSubmit', keys, key, value); 
                })
            });
        }
    }
}