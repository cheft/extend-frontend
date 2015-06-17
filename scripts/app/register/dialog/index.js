module.exports = {
    events: {
        init: function() {
            this.title = this.opts.title || '';
        }
    },
    actions: {
        show: function() {
            this.dialog.className = 'c-dialog show';
            document.body.style.overflow = 'hidden';
        },
        close: function() {
            this.dialog.className = 'c-dialog';
            document.body.style.overflow = 'auto';
        }
    }
};
