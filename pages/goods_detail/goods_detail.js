import { getGoodsDetail } from '../../network/goods'

Page({
	data: {
		goods_id: '',  // 商品id
		swiperList: [],  // 轮播图数据
		goodsInfo: {  // 商品详情数据
			goods_name: '',  // 商品描述
			goods_price: '',  // 商品价格
			goods_introduce: '',  // 商品介绍
			goods_id: '',  // 商品id
		},
		isCollect: false,  // 记录当前商品是否为收藏状态
	},
	// 监听页面的加载
	onLoad(options) {
		// 获取商品id参数
		const { goods_id } = options
		this.setData({
			goods_id
		})
		// 初始化商品详情数据
		this._getGoodsDetail()
	},

	// 监听页面的显示
	onShow() {
		// 1. 从本地存储中获取已收藏的商品
		let collectList = wx.getStorageSync('collectList') || []
		// 2. 判断当前商品是否已经被收藏了
		let isCollect = collectList.some(item => item.goods_id == this.data.goods_id)
		// 3. 初始化商品是否被收藏的状态
		this.setData({
			isCollect
		})
	},

	// 获取商品详情数据
	async _getGoodsDetail() {
		const { message } = await getGoodsDetail(this.data.goods_id)
		this.setData({
			swiperList: message.pics,
			['goodsInfo.goods_name']: message.goods_name,
			['goodsInfo.goods_price']: message.goods_price,
			// iphone不支持webp图片格式，需要转换为jpg格式
			['goodsInfo.goods_introduce']: message.goods_introduce.replace(/\.webp/g, '.jpg'),
			['goodsInfo.goods_id']: message.goods_id
		})
	},

	// 监听加入购物车按钮的点击
	addToCart() {
		// 1. 获取当前详情页中的商品数据，并整合成购物车界面需要的数据
		let good = {
			img: this.data.swiperList[0] && this.data.swiperList[0].pics_mid,  // 商品图片
			title: this.data.goodsInfo.goods_name,  // 商品描述
			price: this.data.goodsInfo.goods_price,  // 商品价格
			id: this.data.goodsInfo.goods_id,  // 商品id
			count: 1,  // 商品数量，默认为1
		}

		// 2. 获取本地存储中的购物车数组
		let cart = wx.getStorageSync('cart') || []

		// 3. 遍历cart数组，判断当前商品是否在购物车数组中
		let index = cart.findIndex(item => item.id === good.id)
		if (index === -1) {
			// 第一次添加商品
			cart.push({ ...good, checked: false });
		} else {
			// 商品已存在cart数组中，让商品数量 + 1
			cart[index].count++
		}

		// 方式二：通过find方式进行判断
		// let item = cart.find(item => item.id === good.id)
		// item ? item.count++ : cart.push({ ...good, checked: false });

		// 4. 将购物车数组添加到本地存储中
		wx.setStorageSync('cart', cart);

		// 5. 弹窗提示
		wx.showToast({
			title: '加入成功',
			mask: true,
		});

	},

	// 监听商品收藏的点击
	collectClick() {
		// 1. 从本地存储中获取已收藏的商品数组
		let collectList = wx.getStorageSync('collectList') || []
		// 获取当前商品的id
		let goods_id = this.data.goodsInfo.goods_id
		// 2. 判断当前商品是否已经被收藏了
		let index = collectList.findIndex(item => item.goods_id === goods_id)
		
		if (index === -1) { // 当前商品没有被收藏过
			collectList.push({ ...this.data.goodsInfo, goods_img: this.data.swiperList[0] && this.data.swiperList[0].pics_mid })
			wx.showToast({
				title: '收藏成功',
				mask: true,
			});
			  
		} else {
			// 从收藏数组中删除当前商品
			collectList.splice(index, 1)
			wx.showToast({
				title: '取消成功',
				mask: true,
			});
		}

		// 3. 把收藏数组放置到本地缓存中
		wx.setStorageSync('collectList', collectList);

		// 4. 修改当前商品的收藏状态
		this.setData({
			isCollect: !this.data.isCollect
		})
	}
});