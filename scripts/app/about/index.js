module.exports = {
    actions: {
        problem: function() {
            app.router.go('problem');
        },
        aboutUs: function() {
            app.router.go('about-us');
        },
        contactUs: function() {
            var dialog = $('.ui-dialog');
            dialog.dialog('show');
            var del = $('#del-layer');
            del.on('touchstart', function(){
                dialog.dialog('hide');
            });
            var tel = $('#tel-bt');
            tel.on('touchstart', function(){
                location.href = 'tel:40080075546';
            });
        }
    },

    events: {
        mount: function() {
            var containerHeight = ($(document).height() > $(window).height()) ? $(document).height() : ($(window).height() - $('.c-footer').height());
            $('.c-container').css('height', containerHeight);
        }
    }
};
