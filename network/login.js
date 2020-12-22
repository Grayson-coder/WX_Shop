import { request } from './network.js'

// 获取用户登录的Token
function getToken(userInfo, code) {
    const { encryptedData, rawData, iv, signature, } = userInfo
    return request({
        url: '/users/wxlogin',
        method: 'POST',
        data: {
            encryptedData,
            rawData,
            iv,
            signature,
            code
        }
    })
}


export {
    getToken
}