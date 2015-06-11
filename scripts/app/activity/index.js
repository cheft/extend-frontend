module.exports = {
    store: 'prizes',

    events: {
        mount: function() {
            this.store.get();
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
            this.store.data = data.data;
            this.update();
        },
        process: function(data) {
            this.recommendedCount = data.content.totalRecommendedCount;
            this.creditedCount = data.content.creditedCount;
            this.prizeAcquired = data.content.prizeAcquired;
            this.nextRecommendedPrize = this.calWidth(this.store.data.prizeList4Signed, this.recommendedCount);
            this.nextCreditedPrize = this.calWidth(this.store.data.prizeList4Credited, this.creditedCount);
            $('.c-recommended-bar-bg').css('width', this.nextRecommendedPrize.percent + '%');
            $('.c-recommended-count').css('left', this.nextRecommendedPrize.percent + '%');
            $('.c-credited-bar-bg').css('width', this.nextCreditedPrize.percent + '%');
            $('.c-credited-count').css('left', this.nextCreditedPrize.percent + '%');
            this.update();
        }
    },

    actions: {
        recommend: function() {
            app.router.go('share/' + this.tags['activity-footer'].store.data.openid);
        },
        goDetail: function() {
            app.router.go('activity-detail');
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