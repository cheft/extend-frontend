module.exports = {
    store: 'activities/landingpage',
    events: {
        mount: function() {
            this.trigger('calHeight');
            app.on('geted_prizes', function(prizes) {
                self.minSignPrize = prizes.prizeList4Signed[0];
                self.maxSignPrize = prizes.prizeList4Signed[prizes.prizeList4Signed.length - 1];
                self.minCreditPrize = prizes.prizeList4Credited[0];
                self.maxCreditPrize = prizes.prizeList4Credited[prizes.prizeList4Credited.length - 1];
                if(this.store && this.store.data) {
                    this.trigger('calPrize');
                }
            });
        },
        openid: function(openid) {
            this.openid = openid;
            this.store.params = {openid: openid};
            this.store.get();
        },

        geted: function(data) {
            if(data.status != 'success') {
                return;
            }
            this.store.data = data.data;
            this.update();
            if(this.store.data && this.store.data.activity.endTime) {
                var endTime = this.store.data.activity.endTime;
                endTime = endTime.replace(' ', 'T') + '.000Z';
                var endDate = new Date(endTime);
                endDate.setHours(endDate.getHours() - 8);
                this.trigger('countDown', endDate);
            }
            app.container.tags.wxshare.trigger('share', this.openid, this.store.data.nextPrize.name);
            if(this.minSignPrize) {
                this.trigger('calPrize');
            }
        },
        calPrize: function() {
            var name = this.store.data.referrer.nickname ? this.store.data.referrer.nickname : this.store.data.referrer.name;
            this.bePrize = '';
            if(this.store.data.friendCount < maxCreditPrize.minLimit && this.store.data.creditedCount < maxCreditPrize.minLimit) {
                this.bePrize = name + '只差' + this.store.data.nextPrizeSignGapCount + '人帮顶';
                if(this.store.creditedCount > 0 || this.store.data.friendCount > minSignPrize.minLimit) {
                    this.bePrize += '或者' + this.store.data.nextPrizeCreditGapCount + '人贷款';
                }
                this.bePrize += '就能获得 ' + this.store.data.nextPrize.name + ' 了';
            }else {
                if(this.store.data.friendCount >= maxSignPrize.minLimit) {
                    this.bePrize = name + ' 已有' + this.store.data.friendCount + '人帮顶获得' + maxSignPrize.name + '，为他喝彩！';
                }
                if(this.store.data.creditedCount >= maxCreditPrize.minLimit) {
                    this.bePrize = name + ' 已推荐' + this.store.data.creditedCount + '人贷款获得' + maxCreditPrize.name + '，为他喝彩！';
                }
            }
            this.update();
        },

        calHeight: function() {
            var prizeHeight = ($(document).height() > $(window).height()) ? 130 : ($(window).height() - $(".c-head").height() - $(".c-person-info").height() - $(".c-background-color").height()); 
            var prizeMt = (prizeHeight - 130)/2;
            $(".c-prize").css("margin-top",prizeMt-1);
            $(".c-prize").css("margin-bottom",prizeMt);
        },

        countDown: function(endDate) {
            var nowDate = new Date();
            var t = endDate - nowDate;
            var d = Math.floor(t/1000/60/60/24);
            var h = Math.floor(t/1000/60/60%24);
            var m = Math.floor(t/1000/60%60);
            var s = Math.floor(t/1000%60);
            this.s.innerText = (s+'').length < 2 ? '0' + s : s;
            this.h.innerText = (h+'').length < 2 ? '0' + h : h;
            this.m.innerText = (m+'').length < 2 ? '0' + m : m;
            this.d.innerText = (d+'').length < 2 ? '0' + d : d;
            self = this;
            setTimeout(function() {
                self.trigger('countDown', endDate);
            }, 1000);
        }
    }
}