module.exports = {
    actions: {
        init: function() {
            this.opts.name = this.opts.name || 'field';
        },

        clear: function(e) {
            this['{opts.name}'].value = '';
            this.validate()
        },

        validate: function() {
            validate = this.opts.validate;
            if(!validate) {
                return;
            }
            var args = validate.split(' ');
            args.unshift(this.opts.label);
            args.unshift($(this.el));
            var result = app.validate.apply(this, args);
            this.trigger('validate', this.opts.label, result);
        }
    },

    events: {
        mount: function() {
            this.el = this['{opts.name}'];
        }
    }
}