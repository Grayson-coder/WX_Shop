// 公共URL
const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
// 请求超时时间 ms
const timeout = 10000000
// 控制网络请求的次数
let index = 0 


// 基于wx.request网络请求的二次封装函数
function request(options) {
    index++
    // 发送请求时展示吐司弹窗
    wx.showToast({
        title: '加载中',
        icon: 'loading',
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + options.url,
            data: options.data || {},
            method: options.method || 'GET',
            timeout,
            header: options.header || {},
            success: (res) => {
                resolve(res.data)
            },
            fail: err => reject(err),
            complete: () => {
                index--
                if (index === 0) {
                    // 请求结束时隐藏吐司弹窗
                    wx.hideToast()
                }

            }
        });
    })
}


// ES6语法导出模块
export {
    request
}