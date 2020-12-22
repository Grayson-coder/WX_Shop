Page({
	data: {
		userInfo: {},  // 存储用户信息
		collectList: [],  // 收藏数组
	},
	onShow() {
		// 1. 从本地缓存中获取用户信息和商品收藏数组
		let userInfo = wx.getStorageSync('userInfo');
		let collectList = wx.getStorageSync('collectList');
		// 2. 初始化用户信息
		this.setData({
			userInfo,
			collectList
		})
	},
	// 监听登录按钮的点击
	login() {
		// 跳转到登录授权页面
		wx.navigateTo({
			url: '../login/login',
		});
	},

	// 监听订单的点击
	orderClick(e) {
		let { index } = e.currentTarget.dataset
		// 跳转到订单页面
		wx.navigateTo({
			url: `../order/order?type=${index}`,
		});
	},

	// 监听收藏按钮的点击
	collectClick() {
		// 跳转到收藏页面
		wx.navigateTo({
			url: `../collect/collect`,
		});
	},

	// 监听意见反馈的点击
	opinionClick() {
		// 跳转到意见反馈页面
		wx.navigateTo({
			url: `../feedback/feedback`,
		});
	}

})