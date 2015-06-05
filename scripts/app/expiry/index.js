module.exports = {
	actions: {
		validate: function(e) {
			// var el = $(e.target);
			var el = $(this.phone);
			app.validate(el, '手机号', 'required', 'phone');
		}
	}
}