Component({
	data: {
		currentIndex: 0 // 记录选项卡的选中
	},
	properties: {
		tabTitle: {  // 选项卡标题
			type: Array,
			value: []
		}
	},
	methods: {
		// 监听选项卡的点击
		tabClick(e) {
			const { index } = e.currentTarget.dataset
			this.setData({
				currentIndex: index
			})
			// 将点击到的索引值发射给父组件
			this.triggerEvent('tabClick', index)
		}
	}
})