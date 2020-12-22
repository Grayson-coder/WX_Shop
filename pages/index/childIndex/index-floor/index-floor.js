Component({
	data: {},
	properties: {
		floorData: {
			type: Array,
			value: []
		}
	},
	methods: {
		// 监听商品的点击
		listClick(e) {
			const { url } = e.currentTarget.dataset
			// 截取url中的参数
			const param = url.substr(18)
			// 跳转到商品列表页面
			wx.navigateTo({
				url: `/pages/goods_list/goods_list?${param}`
			});
			  
		}
	}
})