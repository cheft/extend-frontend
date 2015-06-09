module.exports = {
    events: {
        init: function() {
            this.opts.name = this.opts.name || 'field';
            this.opts.type = this.opts.type || 'text';
        },
        mount: function() {
            this.el = this['{opts.name}'];
        }
    },
    actions: {
        clear: function(e) {
            this['{opts.name}'].value = '';
            this.validate()
            $(this.el).parent().css('border-color', '#ccc');
            $(this.el).prev().css('color', '#ccc');
            $(this._close).hide();
        },

        toggleClose: function() {
            if(this.el.value == '') {
                $(this._close).hide();
            }else {
                $(this._close).show();
            }
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
            $(this._close).show();
            return result;
        }
    }
}