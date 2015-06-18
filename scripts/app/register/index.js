module.exports = {
    store: 'customers',
    events: {
        mount: function() {
            this.trigger('formValidate');
            this.store.url = 'customers/isregister'

            this.tags.code.toggleClose = function() {
                if(this.el.value == '') {
                    $(this._close).hide();
                }else {
                    $(this._close).show();
                    this.validate();
                }  
            };
        },

        geted: function() {
            if(data.data) {
                return app.router.go('activity');
            }
        },

        saved: function(data) {
            if(data.status == 'success') {
                return app.router.go('share/' + data.data);
            }
            app.error(data);
        },

        openid: function(openid) {
            this.refereeOpenid = openid;
        },

        checkSubmit: function(keys, key, value) {
            keys[key] = value;
            var count = 0;
            for(var k in keys) {
                if(keys[k]) {
                    count++;
                }
            }
            if(count >= 6) {
                $(this.submit).attr('disabled', null).removeClass('c-btn-disabled');
            }else {
                $(this.submit).attr('disabled', true).addClass('c-btn-disabled');
            }
        },

        formValidate: function() {
            var keys = {}, self = this;
            this.fieldEach(function(name, field) {
                field.on('validate', function(key, value) {
                    self.trigger('checkSubmit', keys, key, value); 
                })
            });
        }
    },
    actions: {
        register: function(e) {
            var data = {};
            this.fieldEach(function(name, field) {
                data[name] = field.el.value;
            });
            this.store.url = 'customers?verificationCode=' + data.code
            delete data.code;
            data.ident = data.ident.toUpperCase();
            data.refereeOpenid = this.refereeOpenid;
            this.store.save(JSON.stringify(data));
        },

        ranking: function() {
            app.router.go('ranking');
        },
        fieldEach: function(cb) {
            var inputs = ['name', 'ident', 'university', 'major', 'mobile', 'code'];
            for(var i = 0; i < inputs.length; i++) {
                cb(inputs[i], this.tags[inputs[i]]);
            }
        },

        setValue: function() {
            var data = {
                name: '陈海峰',
                ident: '430528199003143053',
                university: '加里顿大学',
                major: '计算机信息与技术',
                mobile: '13316463314',
                code: '123456'
            };
            self = this, keys = {};
            this.fieldEach(function(name, field) {
                field.el.value = data[name];
                self.trigger('checkSubmit', keys, name, data[name]); 
            });
        }
    }
}