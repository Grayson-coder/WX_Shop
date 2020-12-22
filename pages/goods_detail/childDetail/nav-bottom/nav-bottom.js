Component({
	data: {},
	methods: {
		// 监听购物车的点击
		toCartPage() {
			// 跳转到购物车页面
			wx.switchTab({
				url: '/pages/cart/cart',
			});
		},

		// 监听加入购物车按钮的点击
		addToCart() {
			this.triggerEvent('addToCart')
		}
	}
})