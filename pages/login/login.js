
Page({
	// 点击授权按钮
	async getUserInfo(e) {
		// 1. 获取用户信息
		const userInfo = e.detail.userInfo
		// 2. 将用户信息存储在本地缓存中
		wx.setStorageSync('userInfo', userInfo);
		// 3. 返回到个人中心页面
		wx.navigateBack({
			delta: 1
		});
	}
});
