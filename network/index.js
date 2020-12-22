import { request } from './network.js'

// 获取轮播图数据
function getSwiperData() {
    return request({
        url: '/home/swiperdata',
    })
}


// 获取导航数据
function getNavMenu() {
    return request({
        url: '/home/catitems',
    })
}

// 获取楼层数据
function getFloorData() {
    return request({
        url: '/home/floordata',
    })
}

export {
    getSwiperData,
    getNavMenu,
    getFloorData
}