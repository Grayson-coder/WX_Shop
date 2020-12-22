import { getAllOrder } from '../../network/order'
Page({
	data: {
		tabTitle: ['全部', '待付款', '待发货', '退款'],
		currentIndex: 0,  // 记录订单选项卡的点击
		allOrder: [],  // 全部订单
	},
	// 监听页面的加载
	onLoad(options) {
		// 获取页面传递的参数，决定要展示哪一类的订单数据
		let currentIndex = Number(options.type)
		this.setData({
			currentIndex
		})
	},
	// 监听页面的展示
	onShow() {
		// 1. 获取订单数据
		this._getAllOrder()
		// 2. 获取选项卡组件，让选项卡组件与当前页面的currentIndex值进行绑定
		let tabControl = this.selectComponent('#tab-control')
		tabControl.setData({
			currentIndex: this.data.currentIndex
		})
	},

	// 监听选项卡的点击
	tabClick(e) {
		this.setData({
			currentIndex: e.detail
		})
	},

	// 获取订单数据
	async _getAllOrder() {
		// 1. 从本地缓存中获取token
		let token = wx.getStorageSync('token');
		// 2. 判断token是否存在
		if (!token) {
			// 跳转到授权页面
			wx.navigateTo({
				url: '../auth/auth',
			});
			return
		}
		// 3. 根据token发送网络请求，获取订单数据
		let { message } = await getAllOrder(token, 1)
		// 4. 模拟网络请求返回的订单信息...
		let allOrder = [
			{
				"order_price": 13999,
				"create_time": 1564731518,
				"order_number": "HMDD20190802000000000428",
			},
			{
				"order_price": 13999,
				"create_time": 1564731518,
				"order_number": "HMDD20190802000000000428",
			},
			{
				"order_price": 13999,
				"create_time": 1564731518,
				"order_number": "HMDD20190802000000000428",
			}
		]
		// 5. 将网络请求到的数据设置到data下，注意时间戳格式转换
		allOrder.forEach(item => {
			item.create_time = new Date(item.create_time * 1000).toLocaleString()
		})
		this.setData({
			allOrder
		})
	},

})