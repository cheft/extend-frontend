module.exports = {
    events: {
        mount: function() {
            var containerHeight = ($(document).height() > $(window).height()) ? $(document).height() : ($(window).height() - $('.c-footer').height());
            $('.c-container').css('height', containerHeight);
        }
    }
};
