module.exports = {
    events: {
        mount: function() {
            var prizeHeight = ($(document).height() > $(window).height()) ? 130 : ($(window).height() - $(".c-head").height() - $(".c-person-info").height() - $(".c-background-color").height()); 
            var prizeMt = (prizeHeight - 130)/2;
            $(".c-prize").css("margin-top",prizeMt-1);
            $(".c-prize").css("margin-bottom",prizeMt);
        }
    }
}