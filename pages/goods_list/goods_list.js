import { getGoodsList } from '../../network/goods'

Page({
	data: {
		currentIndex: 0,  // 记录选项卡的点击
		queryInfo: {  // 发送网络请求携带的参数
			goods_query: '',  // 关键字
			goods_cid: '',  // 分类id
			goods_pagenum: 1,  // 页码
			goods_pagesize: 10,  // 页容量
		},
		goodsList: []  // 商品列表数据
	},

	// 页面初始化
	onLoad(options) {
		// 1. 获取页面传递的参数
		const { query, cat_id } = options
		// 2. 将传递的参数进行初始化
		this.setData({
			['queryInfo.goods_query']: query || '', // 关键字
			['queryInfo.goods_cid']: cat_id || '',  // 分类id
		})
		// 3. 发送网络请求获取商品列表
		this._getGoodsList()
	},

	// 获取商品列表数据
	async _getGoodsList() {
		const { message } = await getGoodsList(this.data.queryInfo)
		this.setData({
			// 需要合并数组，否则原来的商品列表数据会丢失
			goodsList: [...this.data.goodsList, ...message.goods]
		})
		// 如果服务器返回的商品列表长度为0则没有数据了，弹窗提示
		if (message.goods.length === 0) return wx.showToast({ title: '没有更多了' })
	},

	// 上拉加载更多
	onReachBottom() {
		// 页码 + 1 然后重新发送网络请求
		this.setData({
			['queryInfo.goods_pagenum']: this.data.queryInfo.goods_pagenum += 1 
		})
		this._getGoodsList()
	},

	// 下拉刷新
	onPullDownRefresh() {
		// 1. 初始化页码和商品列表数据
		this.setData({
			['queryInfo.goods_pagenum']: 1,   // 页码
			goodsList: [],  // 商品列表
		})
		// 2. 重新发送网络请求
		this._getGoodsList()
		// 3. 停止当前页面的下拉刷新
		wx.stopPullDownRefresh()
	},

	// 监听选项卡的点击
	tabClick(e) {
		let index = e.detail
		this.setData({
			currentIndex: index
		})
	},

	// 监听商品列表的点击
	goodsListClick(e) {
		let goods_id = e.currentTarget.dataset.goodsId
		// 携带商品id参数跳转页面
		wx.navigateTo({
			url: `/pages/goods_detail/goods_detail?goods_id=${goods_id}`,
		});
		  
	},
});
