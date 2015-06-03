module.exports = {
    actions: {
        clear: function(e) {
            this['{opts.name}'].value = ''
        }
    }
}