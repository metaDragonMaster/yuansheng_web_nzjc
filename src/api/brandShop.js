import request from '@/utils/request';


let Api = {};
//展示优质商家列表
Api.qualityMerchantList = function() {
	return request({
		url: '/nzjcsystem/brandShop/qualityMerchantList',
		method: 'get',
	})
}

//热卖商品
Api.hotGoodsList = function(data) {
	return request({
		url: '/nzjcsystem/brandShop/hotGoodsList',
		method: 'get',
		params: data
	})
}

// //热卖商品
// Api.hotGoodsList2 = function(data) {
//     return request({
//         url: '/nzjcsystem/brandShop/hotGoodsList',
//         method: 'get',
//         params : data,
//     })
// }

//大牌推荐
Api.brandRecommendList = function() {
	return request({
		url: `/nzjcsystem/brandShop/brandRecommendList`,
		method: 'get',
	})
}

export default Api