import { getOrderInfo } from '../../network/order'
import { getPayParam } from '../../network/pay'
import { wx_pay } from '../../utils/asyncWX'

Page({
	data: {
		cartList: [],  // 已选中的购物车商品列表
		address: {},  // 收货地址信息
		totalPrice: 0,  // 总价格
		totalCount: 0,  // 总数量,
	},
	/**
	 * 监听页面的加载
	 */
	onLoad() {
		// 1. 从本地缓存中获取购物车商品列表、收货地址
		let cartList = wx.getStorageSync('cart') || []
		let address = wx.getStorageSync('address')
		// 2. 筛选已选择的商品数组
		cartList = cartList.filter(item => item.checked)
		// 3. 重新设置到data下
		this.setData({
			cartList,
			address,
		})

		// 4. 计算总价格和数量
		this.changeCartStatus(cartList)
	},

	/**
	 * 事件监听
	 */
	// 监听支付的按钮点击
	async payClick() {
		try {
			// 1. 从本地缓存中拿Token
			let token = wx.getStorageSync('token')
			// 如果没有token则跳转到支付授权页面
			if (!token) {
				wx.navigateTo({ url: '../auth/auth' })
				return  // 阻止代码向下运行
			}
			// 2. 获取创建订单时所要携带的请求参数
			let totalPrice = this.data.totalPrice  // 订单总价格
			let address = this.data.address  // 收货地址
			let goods = []  // 订单数组
			this.data.cartList.forEach(item => {
				goods.push({
					goods_id: item.id,  // 商品id
					goods_number: item.count, // 购买的数量
					goods_price: item.price // 单价
				})
			})
			// 3. 发送网络请求，创建订单
			const res = await getOrderInfo(token, totalPrice, address, goods)
			// 模拟网络请求返回的订单编号....
			const order_number = 'HMDD20190802000000000422'
			// 4. 发送网络请求，获取预支付参数
			const result = await getPayParam(token, order_number)
			// 5. 调用微信支付API
			await wx_pay()
			// 6. 模拟支付成功的弹窗
			wx.showToast({
				title: '支付成功',
				icon: 'none'
			});
		} catch (error) {
			// 6. 模拟支付失败的弹窗
			wx.showToast({
				title: '支付失败',
				icon: 'none'
			});
			// 返回到购物车页面
			setTimeout(() => {
				wx.navigateBack({
					delta: 1
				});
			}, 1500)

			// 阻止代码向下运行
			return console.log(error);
		}

		// 7. 从本地缓存中删除已经支付的商品
		let cartList = wx.getStorageSync('cart') || []
		// 遍历购物车数组，筛选没有被选中的商品列表
		const newList = cartList.filter(item => !item.checked)
		// 将没有被选中的商品列表设置到本地存储上
		wx.setStorageSync('cart', newList);
	},


	/**
	 * 自定义方法
	 */
	// 封装一个方法：计算 底部工具栏的数据 全选 总价格 购买的数量
	changeCartStatus(cartList) {
		let totalPrice = 0
		let totalCount = 0

		// 1. 遍历购物车列表，计算选中的商品的总价钱 以及 总数量
		let checkList = cartList.filter(item => item.checked)
		checkList.forEach(item => {
			// 总价钱：totalPrice += 选中商品的数量 * 单价
			totalPrice += item.price * item.count
			// 总数量: totalCount += 选中商品的数量
			totalCount += item.count
		})

		// 3. 重新设置data
		this.setData({
			totalPrice,
			totalCount,
		})
	},
});




