module.exports = {
	store: 'prizes/customer',
	
	events: {
        geted: function(data) {
           	this.store.data = data.data;
           	this.userId = this.store.data.user.openid;
            this.update();
        },
        saved: function(data) {
        	if(data) {
        		return $.tips({content: '兑奖成功', stayTime: 2000, type: 'info'});
        	}
        	app.error(data);
        }
    },
	actions: {
		validate: function(e) {			
			// if(!app.validate($(e.target), '手机号', 'required', 'phone')) {
			// 	return;
			// }
			// this.store.url = 'prizes/customer/' + $(e.target).val();
			this.store.url = 'prizes/customer/13316463314';
			this.store.get();
		},
		choice: function(e) {
			$(this.goodslist).find('.active').removeClass('active');
			$(e.target).addClass('active');
			this.prizeId = e.item.id;
		},
		putIn:function(e) {
			if(!this.prizeId) {
				return $.tips({content: '请先选择奖品', stayTime: 2000, type: 'warn'});
			}
			this.store.url = 'prizes/exchange';
			var data = {
				userId: this.userId,
				prizeId: this.prizeId,
				amount: 1
			}
			this.store.params = data;
			this.store.save(data);
		}
	}
}