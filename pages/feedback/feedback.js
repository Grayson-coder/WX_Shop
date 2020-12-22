// pages/feedback/feedback.js
Page({
	data: {
		selectImg: [],  // 选中图片的路径
		inputVal: '',  // 多行文本框的值
	},
	// 监听添加图片的按钮点击
	addImg() {
		// 调用API让用户选择图片
		wx.chooseImage({
			// 同时选中的图片的数量
			count: 3,
			// 图片的格式  原图  压缩
			sizeType: ['original', 'compressed'],
			// 图片的来源  相册  照相机
			sourceType: ['album', 'camera'],
			success: res => {
				this.setData({
					// 将选择的图片路径，与之前的图片路径 进行数组拼接
					selectImg: [...this.data.selectImg, ...res.tempFiles]
				})
			}
		});
	},

	// 监听删除图片的按钮点击
	deleteImg(e) {
		let { index } = e.currentTarget.dataset
		// 根据索引删除数组中指定的元素
		this.data.selectImg.splice(index, 1)
		this.setData({
			selectImg: this.data.selectImg
		})
	},

	// 监听提交按钮的点击
	submit() {
		let { inputVal, selectImg } = this.data
		if (!inputVal.trim()) {
			wx.showToast({
				title: '文本框不允许为空',
				icon: 'none',
				duration: 1500,
				mask: true,
			});
			return
		}

		wx.showLoading({
			title: "正在上传中",
			mask: true
		});

		if (selectImg.length !== 0) {
			selectImg.forEach((item, index) => {
				wx.uploadFile({
					// 图片要上传到哪里
					url: 'https://images.ac.cn/Home/Index/UploadAction/',
					// 被上传的文件的路径
					filePath: item.path,
					// 上传的文件的名称 后台来获取文件  file
					name: 'file',
					// 顺带的文本信息
					formData: {},
					success: (result) => {
						if (index === selectImg.length - 1) {
							wx.hideLoading();
							wx.showToast({
								title: '提交成功',
								mask: true,
							});

							setTimeout(() => {
								// 返回上一个页面
								wx.navigateBack({
									delta: 1
								});
							}, 1500)
						}
					},
				});
			})
		} else {
			console.log('只提交了文本');
			wx.hideLoading();
			wx.showToast({
				title: '提交成功',
				image: '',
				mask: true,
			});
			setTimeout(() => {
				// 跳转到上一个页面
				wx.navigateBack({
					delta: 1
				});
			}, 1500)

		}


	},


	// 监听多行文本框的输入
	inputChange(e) {
		let { value } = e.detail
		this.setData({
			inputVal: value
		})
	},
})