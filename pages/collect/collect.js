// pages/collect/collect.js
Page({
	data: {
		tabTitle: ['商品收藏', '品牌收藏', '店铺收藏', '浏览足迹'],
		collectList: [],  // 商品收藏数组
	},
	onShow() {
		// 1. 从本地缓存中获取商品收藏数组
		let collectList = wx.getStorageSync('collectList');
		// 2. 设置到data下
		this.setData({
			collectList
		})
	},
	
	// 监听商品列表的点击
	goodsListClick(e) {
		let { id } = e.currentTarget.dataset
		// 携带商品id参数跳转到商品详情页面
		wx.navigateTo({
			url: `../goods_detail/goods_detail?goods_id=${id}`,
		});
		  
	},

	// 监听选项卡的点击
	tabClick(e) {
		console.log(e.detail);
	},
})