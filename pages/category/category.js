import { getCategory } from '../../network/category'

Page({
	data: {
		cateList: [],  // 分类数据
		leftMenuName: [],  // 左侧分类名称
		rightContent: [],  // 右侧内容数据
		currentIndex: 0,  // 记录左侧菜单栏的选中
		scrollTop: 0,  // 控制右侧内容区域的滚动高度
	},
	onLoad() {
		this._checkStorage()
	},

	// 验证本地存储数据
	_checkStorage() {
		const Cate = wx.getStorageSync('Cate');
		// 判断是否有本地存储或者本地存储的数据时间是否超过了 6000ms
		if (!Cate || Date.now() - Cate.time > 1000 * 6000) {
			// 重新发送网络请求获取分类数据
			this._getCategory()
		} else {
			// console.log('利用本地存储数据');
			// 利用本地存储的数据初始化页面
			this.setData({
				leftMenuName: Cate.data.map(item => item.cat_name),
				rightContent: Cate.data[0].children,
				cateList: Cate.data
			})
		}
	},

	// 获取分类数据
	async _getCategory() {
		// 1. 发送网络请求 获取分类数据
		const { message } = await getCategory()
		// 2. 将请求到的数据存储到微信小程序本地中
		wx.setStorageSync('Cate', { time: Date.now(), data: message })
		// 3. 初始化分类界面数据
		this.setData({
			leftMenuName: message.map(item => item.cat_name),
			rightContent: message[0].children,
			cateList: message
		})
	},

	// 监听左侧菜单栏的点击
	leftMenuClick(e) {
		// 1. 获取左侧菜单栏的索引值
		const { index } = e.currentTarget.dataset
		// 2. 根据左侧菜单栏的索引值，获取对应的右侧内容，重新设置右侧滚动高度
		const rightContent = this.data.cateList[index].children
		this.setData({
			currentIndex: index,
			rightContent,
			scrollTop: 0
		})
	},

	// 监听品牌列表的点击
	brandListClick(e) {
		const { id } = e.currentTarget.dataset
		// 携带分类id参数跳转到商品列表页面
		wx.navigateTo({
			url: `/pages/goods_list/goods_list?cat_id=${id}`,
		});
	}
})