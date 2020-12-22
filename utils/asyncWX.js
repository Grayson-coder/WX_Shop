// 封装模态框
function showModal(title, content) {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: title || '提示',
            content: content || '模态框内容',
            success: res => resolve(res),
            fail: err => reject(err)
        });
    })
}

// 封装微信登录
function login() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => resolve(res),
            fail: err => reject(err),
        });
          
    })
}

// 封装微信支付
function wx_pay() {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            timeStamp: "",
			nonceStr: "",
			package: "",
			signType: "",
			paySign: "",
            success: res => resolve(res),
            fail: err => reject(err)
          })
    })
}


export {
    showModal,
    login,
    wx_pay,
}