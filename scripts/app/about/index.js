module.exports = {
    events: {
        mount: function() {
            var containerHeight = ($(document).height() > $(window).height()) ? $(document).height(): ($(window).height()-$(".c-footer").height());
            $(".c-container").css("height",containerHeight);
            
            var contact = $("#contact-us");
            contact.on("touchstart",function(){
            	var dialog = $('.ui-dialog');
				dialog.dialog('show');
				var del = $('#del-layer');
				del.on('touchstart',function(){
					dialog.dialog('hide');
				});q
				var tel = $('#tel-bt');
				tel.on('touchstart',function(){
					location.href = 'tel:40080075546';
				});
            });    
        }
    }
}