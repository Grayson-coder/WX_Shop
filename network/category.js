import { request } from './network.js'

// 获取分类界面数据
function getCategory() {
    return request({
        url: '/categories',
    })
}

export {
    getCategory
}