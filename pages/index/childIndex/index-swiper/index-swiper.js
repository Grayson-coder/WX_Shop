Component({
	data: {},
	properties: {
		imgList: {  // 轮播图数据
			type: Array,
			value: []
		}
	},
	methods: {
		// 监听轮播图的点击
		swiperClick(e) {
			let { goodsId } = e.currentTarget.dataset
			// 跳转到详情页
			wx.navigateTo({
				url: `/pages/goods_detail/goods_detail?goods_id=${goodsId}`,
			});
		}
	}
})