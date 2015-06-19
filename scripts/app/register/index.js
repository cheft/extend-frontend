module.exports = {
    store: 'customers',
    events: {
        mount: function() {
            this.trigger('formValidate');
            this.store.url = 'customers/attr';
            this.store.get().done(function(data) {
                if(data.status === 'fail') {
                    if(typeof WeixinJSBridge === 'undefined') {
                        history.back();
                    }else {
                        WeixinJSBridge.call('closeWindow');
                    }
                }else {
                    if(data.data.exists) {
                        return app.router.go('activity');
                    }
                }
            });

            var self = this;
            $(this.tags.position.root).on('click', function() {
                self.openPosition();
            });
            $(this.tags.university.root).on('click', function() {
                self.openUniversity();
            });

            this.tags.code.toggleClose = function() {
                if(this.el.value === '') {
                    $(this.close).hide();
                }else {
                    $(this.close).show();
                    this.validate();
                }
            };
        },

        saved: function(data) {
            if(data.status === 'success') {
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
                });
            });
        }
    },
    actions: {
        register: function() {
            var data = {};
            this.fieldEach(function(name, field) {
                data[name] = field.el.value;
            });
            this.store.url = 'customers?verificationCode=' + data.code;
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
        openPosition: function() {
            var self = this;
            this.tags.university.el.value = '';
            this.tags.university.clear();
            this.store.url = 'provinces';
            this.store.get().done(function(data) {
                self.provinces = data.data;
                self.update();
                self.tags.p.show();
            });
        },
        openUniversity: function() {
            if(this.tags.position.el.value === '') {
                return $.tips({content: '请先选择省和城市', stayTime: 2000, type: 'warn'});
            }
            this.tags.s.show();
        },
        selectP: function(e) {
            var self = this;
            this.tags.position.value = e.target.innerHTML;
            this.store.url = encodeURIComponent('provinces/' + e.target.innerHTML + '/cities');
            this.store.get().done(function(data) {
                self.cities = data.data;
                self.update();
                self.tags.p.close();
                self.tags.c.show();
            });
        },
        selectC: function(e) {
            var self = this;
            this.store.url = encodeURIComponent('cities/' + e.target.innerHTML + '/universities');
            this.store.get().done(function(data) {
                self.schools = data.data || [];
                self.update();
                self.tags.c.close();
                self.tags.s.show();
            });
            this.tags.position.el.value = this.tags.position.value + '/' + e.target.innerHTML;
            this.tags.position.validate();
        },
        selectS: function(e) {
            this.tags.university.el.value = e.target.innerHTML;
            this.tags.university.validate();
            this.tags.s.close();
        }
    }
};
