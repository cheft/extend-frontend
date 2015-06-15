module.exports = {
    store: 'activities/myactivitypage',

    events: {
        mount: function() {
            this.store.get();
        },
        geted: function(data) {
            if(data.status != 'success') {
                return;
            }
            this.store.data = data.data;
            this.parent.trigger('process', this.store.data);
            var inviter = '';
            if(this.store.data.content.myReferrer) {
                if(this.store.data.content.myReferrer.nickname) {
                    inviter += this.store.data.content.myReferrer.nickname;
                }else {
                    inviter += this.store.data.content.myReferrer.name;
                }
                var mobile = this.store.data.content.myReferrer.mobile;
                inviter += '(' + mobile.replace(mobile.substr(3, 4), '****') + ')';
            }else {
                inviter = '无';
            }
            this.inviter = inviter;
            app.container.tags.signature.trigger('share', this.store.data.openid, this.parent.nextCreditedPrize.name);
            this.update();
        }
    },

    actions: {
        ranking: function(e) {
            if(app.isTouchmove(e)) {
                return;
            };
            app.router.go('ranking');
        },

        invitation: function(e) {
            if(app.isTouchmove(e)) {
                return;
            };
            app.router.go('invitation');
        }
    }
}