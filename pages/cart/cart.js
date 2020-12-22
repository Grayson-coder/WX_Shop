import { showModal } from '../../utils/asyncWX'

Page({
	data: {
		cartList: [],  // 购物车商品列表
		address: {},  // 收货地址信息
		totalPrice: 0,  // 总价格
		totalCount: 0,  // 总数量,
		allChecked: false,  // 控制是否全选
	},
	/**
	 * 监听页面显示
	 */
	onShow() {
		// 1. 从本地缓存中获取购物车商品列表、收货地址
		const cartList = wx.getStorageSync('cart') || []
		const address = wx.getStorageSync('address')
		// 2. 将本地缓存中获取到的数据设置到data下
		this.setData({
			cartList,
			address,
		})

		// 3. 初始化购物车底部工具栏状态
		this.changeCartStatus(cartList)
	},

	/**
	 * 事件监听函数
	 */
	// 监听收货地址按钮的点击
	addressClick() {
		wx.chooseAddress({
			// 当用户选择完收货地址后触发success函数，res为收货信息
			success: res => {
				// 1. 将收货信息写入到本地缓存中
				wx.setStorageSync('address', res);
				// 2. 将收货信息定义在data下
				this.setData({
					address: res
				})
			}
		})
	},

	// 监听全选按钮的点击
	allChecked() {
		// 1. 将data下的allChecked属性进行取反
		this.setData({
			allChecked: !this.data.allChecked
		})
		// 2. 获取data数据
		const { cartList, allChecked } = this.data
		// 3. 遍历cartList数据，将每个商品的checked属性都与allChecked保持一致
		cartList.forEach(item => item.checked = allChecked)
		// 4. 重新设置data和本地存储的数据 并 修改购物车底部工具栏状态
		this.changeCartStatus(cartList)
	},

	// 监听商品复选框的改变
	handleChange(e) {
		// 1. 获取data下的数据
		let { cartList } = this.data
		// 2. 获取被修改的商品对象的索引值和选中状态
		let { index, checked } = e.currentTarget.dataset
		// 3. 根据索引值将被修改的商品对象的选中状态 取反
		cartList[index].checked = !checked
		// 4. 重新设置data和本地存储的数据 并 修改购物车底部工具栏状态
		this.changeCartStatus(cartList)

	},

	// 监听 增加/减少 商品数量按钮的点击
	async changeCount(e) {
		// 1. 获取data下的数据
		let { cartList } = this.data
		// 2. 获取商品对象的索引值和操作值
		let { index, operation } = e.currentTarget.dataset
		// 3. 判断当前商品的数量是否 = 1 并且操作值为 - 1
		if (cartList[index].count === 1 && operation === -1) {
			// 1. 展示模态框
			let res = await showModal('提示', '是否要删除该商品?')
			// 2. 判断是否点击了模态框的确认按钮
			if (res.confirm) {
				// 3. 删除购物车列表数组中对应的数据
				cartList.splice(index, 1)
				// 4. 重新设置data和本地存储的数据 并 修改购物车底部工具栏状态
				this.changeCartStatus(cartList)
			}
			return  // 阻止程序向下运行
		}
		// 4. 修改商品对象的数量
		cartList[index].count += operation
		// 5. 重新设置data和本地存储的数据 并 修改购物车底部工具栏状态
		this.changeCartStatus(cartList)
	},

	// 监听结算按钮的点击
	payClick() {
		// 1. 获取data数据
		let { cartList, address } = this.data
		
		// 2. 遍历数组，判断是否有选中商品
		let checked = cartList.length <= 0 ? false : cartList.some(item => item.checked)
		if (!checked) {
			wx.showToast({
				title: '你还没有选择商品',
				icon: 'none'
			});
			return // 阻止程序向下运行
		}
		if (!address) {
			wx.showToast({
				title: '你还没有选择收货地址',
				icon: 'none'
			});
			return // 阻止程序向下运行
		} 
		// 跳转到支付页面
		wx.navigateTo({
			url: '../pay/pay',
		});
	},


	/**
	 * 自定义方法
	 */
	// 封装一个方法：设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
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

		// 2. 遍历购物车列表，判断选中商品的长度是否等于购物车列表的长度 关联全选按钮
		let isAllChecked = cartList.length === 0 ? false : checkList.length === cartList.length

		// 3. 重新设置data
		this.setData({
			totalPrice,
			totalCount,
			cartList,
			allChecked: isAllChecked
		})

		// 4. 重新设置本地存储的数据
		wx.setStorageSync('cart', this.data.cartList);
	},
});
