module.exports = {
    stores: {
        ranking: {}
    },

    events: {
        mount: function() {
            self = this;
            var l = $.loading({
                content:'加载数据',
            });
            this.ranking.get().done(function(data) {
                self.list = data;
                self.update();
                l.loading('hide');
                $.tips({
                    content:'数据加载完成',
                    stayTime:2000,
                    type: 'success'
                })
            });
        } 
    }
}