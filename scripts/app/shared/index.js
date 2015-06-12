module.exports = {
    store: 'activities/landingpage',
    events: {
        mount: function() {
            this.trigger('calHeight');
        },
        openid: function(openid) {
            this.openid = openid;
            this.store.params = {openid: openid};
            this.store.get();
        },

        geted: function(data) {
            this.store.data = data.data;
            this.update();
            if(this.store.data && this.store.data.activity.endTime) {
                var endTime = this.store.data.activity.endTime;
                endTime = endTime.replace(' ', 'T') + '.000Z';
                this.trigger('countDown', endTime);
            }
            app.container.tags.signature.trigger('share', this.openid, this.store.data.nextPrize.name);
        },

        calHeight: function() {
            var prizeHeight = ($(document).height() > $(window).height()) ? 130 : ($(window).height() - $(".c-head").height() - $(".c-person-info").height() - $(".c-background-color").height()); 
            var prizeMt = (prizeHeight - 130)/2;
            $(".c-prize").css("margin-top",prizeMt-1);
            $(".c-prize").css("margin-bottom",prizeMt);
        },

        countDown: function(date) {
            var endTime= new Date(date);
            var nowTime = new Date();
            var t = endTime - nowTime;
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
                self.trigger('countDown', date);
            }, 1000);
        }
    },
    actions: {
        goDetail: function() {
            app.router.go('activity-detail');
        }
    }
}