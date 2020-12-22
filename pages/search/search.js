import { searchGoods } from '../../network/goods'

Page({
    data: {
        inputVal: '', // 搜索框输入的值
        goodsList: [],  // 搜索的商品列表
        timerID: '', // 实现防抖
        showCancel: false  // 控制取消按钮的显示
    },
    // 监听搜索表单的输入
    inputChange(e) {
        // 关闭上一次的定时器
        clearTimeout(this.data.timerID)
        // 1. 获取表单中的值
        let { value } = e.detail
        // 如果文本框没有值，则不发送网络请求
        if (!value) {
            // 清空商品列表以及隐藏取消按钮
            this.setData({
                goodsList: [],
                showCancel: false
            })
            return    
        }
        this.setData({
            inputVal: value,
            showCancel: true
        })
        this.data.timerID = setTimeout(() => {
            // 2. 发送网络请求，获取搜索的商品的数据
            this._searchGoods(this.data.inputVal)
        }, 800);

    },

    // 监听取消按钮的点击
    cancelClick() {
        this.setData({
            inputVal: '',
            goodsList: [],
            showCancel: false,
        })
    },

    // 发送网络获取搜索的商品列表数据
    async _searchGoods(query) {
        let { message } = await searchGoods(query)
        let goodsList = message.goods
        this.setData({
            goodsList
        })
    },


    // 监听商品列表的点击
    goodsListClick(e) {
        let { id } = e.currentTarget.dataset
        // 携带商品id跳转到商品详情页
        wx.navigateTo({
            url: '../goods_detail/goods_detail?goods_id=' + id,
        });
          
    },
})