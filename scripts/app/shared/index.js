module.exports = {
    events: {
        mount: function() {
            this.trigger('calHeight');
            this.trigger('countDown');
        },

        calHeight: function() {
            var prizeHeight = ($(document).height() > $(window).height()) ? 130 : ($(window).height() - $(".c-head").height() - $(".c-person-info").height() - $(".c-background-color").height()); 
            var prizeMt = (prizeHeight - 130)/2;
            $(".c-prize").css("margin-top",prizeMt);
            $(".c-prize").css("margin-bottom",prizeMt);
        },

        countDown: function() {
            var endTime= new Date('2015/06/10 00:00:00');
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
                self.trigger('countDown');
            }, 1000);
        }
    }
}