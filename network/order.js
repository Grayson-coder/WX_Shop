import { request } from './network.js'

// 创建订单
function getOrderInfo(token, order_price, consignee_addr, goods) {
    return request({
        url: '/my/orders/create',
        method: 'POST',
        header: {
            Authorization: token
        },
        data: {
            order_price,
            consignee_addr,
            goods,
        }
    })
}

// 查询所有订单
function getAllOrder(token, number) {
    return request({
        url: '/my/orders/all',
        header: {
            Authorization: token
        },
        data: {
            number
        }
    })
}


export {
    getOrderInfo,
    getAllOrder
}