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
			// 1. 获取轮播图图片路径的数组
			let urls = this.data.imgList.map(item => item.pics_mid)
			let { index } = e.currentTarget.dataset
			// 实现功能：图片放大预览
			wx.previewImage({
				urls,
				current:urls[index]  // 当前展示图片路径数组的第几个索引
			})
		}
	}
})

