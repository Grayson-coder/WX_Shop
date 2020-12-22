Component({
	methods: {
		// 监听搜索的点击
		searchClick() {
			wx.navigateTo({
				url: "/pages/search/search"
			})
		}
	},
})