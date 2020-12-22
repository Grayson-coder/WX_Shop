import { request } from './network.js'

// 获取支付参数
function getPayParam(token, order_number) {
    return request({
        url: '/my/orders/req_unifiedorde',
        method: 'POST',
        header: {
            Authorization: token
        },
        data: {
            order_number
        }
    })
}


export {
    getPayParam
}