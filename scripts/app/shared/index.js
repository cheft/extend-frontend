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
            document.title = this.store.data.activity.name;
            this.update();
            this.trigger('countDown', this.store.data.activity.endTime);
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
            var t = endTime.getTime() - nowTime.getTime();
            var d = Math.floor(t/1000/60/60/24);
            var h = Math.floor(t/1000/60/60%24);
            var m = Math.floor(t/1000/60%60);
            var s = Math.floor(t/1000%60);
            this.s.innerText = s;
            this.h.innerText = h;
            this.m.innerText = m;
            this.d.innerText = d;
            self = this;
            setTimeout(function() {
                self.trigger('countDown', date);
            }, 1000);
        }
    },

    actions: {
        ding: function() {
            app.router.go('register/' + this.openid);
        },
        yao: function() {
            app.router.go('register');
        }
    }
}