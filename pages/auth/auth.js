import { getToken } from '../../network/login'
import { login } from '../../utils/asyncWX'

Page({
	// 点击授权按钮
	async getUserInfo(e) {
		// 1. 获取用户信息
		const userInfo = e.detail
		// 2. 获取用户登录的code
		const { code } = await login()
		// 3. 发送网络请求获取token
		const res = await getToken(userInfo, code)
		// 由于不是企业级微信账号，无法获取token， 只能模拟...
		const token = 'edsefsdfwe098wef7sdf7sdfd72'
		// 4. 将token存储在本地缓存中
		wx.setStorageSync('token', token);
		// 5. 返回到上一个页面
		wx.navigateBack({
			delta: 1
		});
		  
	}
});
