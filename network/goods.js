import { request } from './network.js'

// 获取商品列表数据
function getGoodsList({ goods_query, goods_cid, goods_pagenum, goods_pagesize, }) {
    return request({
        url: '/goods/search',
        data: {
            query: goods_query,
            cid:  goods_cid,
            pagenum: goods_pagenum,
            pagesize: goods_pagesize
        }
    })
}



// 获取商品详情数据
function getGoodsDetail(goods_id) {
    return request({
        url: '/goods/detail',
        data: {
            goods_id
        }
    })
}

// 商品列表搜索
function searchGoods(query) {
    return request({
        url: '/goods/search',
        data: {
            query
        }
    })
}




export {
    getGoodsList,
    getGoodsDetail,
    searchGoods
}