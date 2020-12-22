import { getSwiperData, getNavMenu, getFloorData } from '../../network/index.js'

Page({
    data: {
        swiperData: [],  // 轮播图数据
        navMenu: [],  // 导航菜单
        floorData: [],  // 楼层数据
    },
    onLoad() {
        this._getSwiperData()
        this._getNavMenu()
        this._getFloorData()
    },

    // 获取轮播图数据
    async _getSwiperData() {
        const { message } = await getSwiperData()
        this.setData({
            swiperData: message
        })
    },

    // 获取导航数据
    async _getNavMenu() {
        let { message } = await getNavMenu()
        this.setData({
            navMenu: message
        })
    },
    // 获取楼层数据
    async _getFloorData() {
        let { message } = await getFloorData()
        this.setData({
            floorData: message
        })
    }
});
