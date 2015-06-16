module.exports = {
    store: 'activities/myactivitypage',
    events: {
        mount: function() {
            self = this;
            self.store.get();
            app.on('geted_prizes', function(prizes) {
                self.prizes = prizes;
                self.minSignPrize = prizes.prizeList4Signed[0];
                self.maxSignPrize = prizes.prizeList4Signed[prizes.prizeList4Signed.length - 1];
                self.minCreditPrize = prizes.prizeList4Credited[0];
                self.maxCreditPrize = prizes.prizeList4Credited[prizes.prizeList4Credited.length - 1];
                self.update();
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
        },
        geted: function(data) {
            if(data.status != 'success') {
                return;
            }
            this.store.data = data.data;
            var inviter = '';
            if(data.data.content.myReferrer) {
                if(data.data.content.myReferrer.nickname) {
                    inviter += data.data.content.myReferrer.nickname;
                }else {
                    inviter += data.data.content.myReferrer.name;
                }
                var mobile = data.data.content.myReferrer.mobile;
                inviter += '(' + mobile.replace(mobile.substr(3, 4), '****') + ')';
            }else {
                inviter = '无';
            }
            this.inviter = inviter;
            this.recommendedCount = data.data.content.totalRecommendedCount;
            this.creditedCount = data.data.content.creditedCount;
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

            this.update();
            app.container.tags.wxshare.trigger('share', data.data.openid, this.nextRecommendedPrize.name);
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
        }
    }
}