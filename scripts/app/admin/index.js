module.exports = {
	store: 'prizes/customer',
	
	events: {
        geted: function(data) {
           	this.store.data = data.data;
            if(this.store.data.user) {
            	this.userId = this.store.data.user.id;
            }else {
                $.tips({content: '无兑奖信息', stayTime: 2000, type: 'warn'});
            }
            this.update();
        },
        saved: function(data) {
        	if(data.status == 'success') {
        		$.tips({content: '兑奖成功', stayTime: 2000, type: 'info'});
        	}else {
        	   app.error(data);
            }
            this.search();
        }
    },
	actions: {
		search: function() {
            if(this.phone.value.trim() == '') {
                return $.tips({content: '请填写手机号进行搜索', stayTime: 2000, type: 'warn'});
            }
			if(!app.validate($(this.phone), '手机号', 'phone')) {
				return;
			}
			this.store.url = 'prizes/customer/' + $(this.phone).val();
			this.store.get();
		},
		choice: function(e) {
			$(this.goodslist).find('.active').removeClass('active');
			$(e.target).addClass('active');
			this.prizeId = e.item.id;
		},
		putIn: function(e) {
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