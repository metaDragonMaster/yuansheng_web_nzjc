import request from '@/utils/request'
let Api = {};

//获取轮播图
Api.getCommonBanner = function() {
	return request({
		url: '/common/banner/nzjcBanner',
		method: 'get',
	});
}


export default Api;
