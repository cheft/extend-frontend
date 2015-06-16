module.exports = {
    store: 'activities/myactivitypage',
    events: {
        mount: function() {
            self = this;
            this.store.url = 'prizes';
            this.store.get().done(function(data) {
                self.prizes = data.data;
                self.store.url = 'activities/myactivitypage';
                self.store.get().done(function(data) {
                    if(data.status != 'success') {
                        return;
                    }
                    self.store.data = data.data;
                    self.calPrize(data.data);
                });
            });
        },
        updated: function() {
            var list1 = $('.c-recommended-bar li');
            if(list1.length > 0) {
                list1.css('width',  100 / list1.length + '%');
                $('.c-recommended-prize li').css('width', 100 / list1.length + '%');
            }
            var list2 = $('.c-credited-bar li');
            if(list2.length > 0) {
                list2.css('width',  100 / list2.length + '%');
                $('.c-credited-prize li').css('width', 100 / list2.length + '%');
            }
        }
    },

    actions: {
        recommend: function(e) {
            if(app.isTouchmove(e)) {
                return;
            };
            app.router.go('share/' + this.store.data.openid);
        },
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
        },
        calWidth: function(list, count) {
            var scale = 100 / list.length;
            var prize = {percent: 0}, tmp = 0;
            for(var i = 0; i < list.length; i++) {
                var p = list[i];
                if(count >= p.minLimit) {
                    prize.percent += scale;
                    tmp = p.minLimit;
                }else {
                    prize.percent += (count - tmp) / (p.minLimit - tmp) * scale;
                    prize.name = p.name;
                    prize.number = p.minLimit - count;
                    break;
                }
            }
            return prize;
        },
        calPrize: function(data) {
            var inviter = '';
            if(data.content.myReferrer) {
                if(data.content.myReferrer.nickname) {
                    inviter += data.content.myReferrer.nickname;
                }else {
                    inviter += data.content.myReferrer.name;
                }
                var mobile = data.content.myReferrer.mobile;
                inviter += '(' + mobile.substr(0, 3) + '****' + mobile.substr(7) + ')';
            }else {
                inviter = '无';
            }
            this.inviter = inviter;
            this.recommendedCount = data.content.totalRecommendedCount;
            this.creditedCount = data.content.creditedCount;
            this.maxSignPrize = this.prizes.prizeList4Signed[this.prizes.prizeList4Signed.length - 1];
            this.maxCreditPrize = this.prizes.prizeList4Credited[this.prizes.prizeList4Credited.length - 1];
            this.nextRecommendedPrize = this.calWidth(this.prizes.prizeList4Signed, this.recommendedCount);
            this.nextCreditedPrize = this.calWidth(this.prizes.prizeList4Credited, this.creditedCount);
            if(this.nextRecommendedPrize.percent >= 100) {
                this.nextRecommendedPrize.percent = 100;
            }
            if(this.nextCreditedPrize.percent >= 100) {
                this.nextCreditedPrize.percent = 100;
            }
            $('.c-recommended-bar-bg').css('width', this.nextRecommendedPrize.percent + '%');
            $('.c-recommended-count').css('left', this.nextRecommendedPrize.percent + '%');
            $('.c-credited-bar-bg').css('width', this.nextCreditedPrize.percent + '%');
            $('.c-credited-count').css('left', this.nextCreditedPrize.percent + '%');

            app.container.tags.wxshare.trigger('share', data.openid, this.nextRecommendedPrize.name);
            this.update();
        }
    }
}