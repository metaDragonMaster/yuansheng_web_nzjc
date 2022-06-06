import request from '@/utils/request';
import $store from "@/store/index.js";



let Api = {};


// //展示优质商家列表
// Api.qualityMerchantList = function() {
// 	return request({
// 		url: '/nzjcsystem/brandShop/qualityMerchantList',
// 		method: 'get',
// 	})
// }

// //热卖商品
// Api.hotGoodsList = function() {
// 	return request({
// 		url: '/nzjcsystem/brandShop/hotGoodsList',
// 		method: 'get',
// 	})
// }

// //热卖商品
// Api.hotGoodsList2 = function(data) {
//     return request({
//         url: '/nzjcsystem/brandShop/hotGoodsList',
//         method: 'get',
//         params : data,
//     })
// }

// //大牌推荐
// Api.brandRecommendList = function(merchantId) {
// 	return request({
// 		url: `/nzjcsystem/brandShop/brandRecommendList/${merchantId}`,
// 		method: 'get',
// 	})
// }

//供货大厅列表
Api.ghlist = function(data) {
	return request({
		url: "/nzjcsystem/gh/list",
		method: 'get',
		params : data,
	})
}

//供货详情
Api.ghdetail = function(ghOrderId) {
	return request({
		url: `/nzjcsystem/gh/detail/${ghOrderId}`,
		method: 'get',
	})
}

//供货大厅列表
Api.cglist = function(data) {
	return request({
		url: "/nzjcsystem/cg/list",
		method: 'get',
		params : data,
	})
}

//采购详情
Api.cgdetail = function(cgOrderId) {
	return request({
		url: `/nzjcsystem/cg/detail/${cgOrderId}`,
		method: 'get',
	})
}

//发布货源
Api.ghrelease = function(data) {
	return request({
		url: "/nzjcsystem/gh/release",
		method: 'post',
		data : data,
	})
}

//发布需求单
Api.cgrelease = function(data) {
	return request({
		url: "/nzjcsystem/cg/release",
		method: 'post',
		data : data,
	})
}

///商品品类列表
Api.ghtreeGoodsTypeList = function() {
	return request({
		url:'/nzjcsystem/gh/treeGoodsTypeList',
		method: 'get',
	})
}

///商品重量类型列表
Api.ghgoodsWeightTypeList = function() {
	return request({
		url:'/nzjcsystem/gh/goodsWeightTypeList',
		method: 'get',
	})
}

//我要采购
Api.cgpurchase = function(cgInfoId,data) {
    return request({
        url: `/nzjcsystem/cg/purchase/${cgInfoId}`,
        method: 'put',
        params : data,
    })
}

//我要购买
Api.ghprovide = function(cgInfoId,data) {
    return request({
        url: `/nzjcsystem/gh/provide/${cgInfoId}`,
        method: 'put',
        params : data,
    })
}

//购物车列表
Api.shopCartList = function() {
    return request({
        url: '/nzjcsystem/shopCart/shopCartList',
        method: 'get',
    })
	.then(res=>{
		$store.dispatch('shopCart/setShopCartNum',res.data.length);
		// (res.data.length);
		// console.log(res.data.length)
		return res;
	})
}

Api.shopCartdelete = function(shopCartId) {
    return request({
        url: `/nzjcsystem/shopCart/delete/${shopCartId}`,
        method: 'delete',
    })
}

//购物车提交
Api.shopCartCommit = function(data) {
    return request({
        url: '/nzjcsystem/shopCart/commitShopCart',
        method: 'put',
        params : data,
    })
}

//供货大厅分类列表
Api.ghGoodsTypeList = function() {
    return request({
        url: '/nzjcsystem/gh/ghGoodsTypeList',
        method: 'get',
    })
}

//采购大厅分类列表
Api.cgGoodsTypeList = function() {
    return request({
        url: '/nzjcsystem/cg/cgGoodsTypeList',
        method: 'get',
    })
}

/*
	获取ossPolicy
	fileType	文件类型,可用值:image	query	true	string
	moduleName	模块名,可用值:nzjc,ncq,web	query	true	string
*/
Api.getOssPolicy = function(data) {
    return request({
        url: '/auth/oss/getOssPolicy',
        method: 'get',
        params: data
    })
}

//获取用户信息
//登录之后才有用。
Api.getUserInfo = function() {
    return request({
        url: '/auth/userCenter',
        method: 'get',
    })
}

/**
 *展示地址列表
 * */
Api.showAddressList = function () {
    return request({
        url: '/commonservice/userCenter/address/showAddressList',
        method: 'get'
    });
}

/**
 *增加地址
 * */
Api.addAddress = function (data) {
    return request({
        url: '/commonservice/userCenter/address/addAddress',
        method: 'post',
        data:data
    });
}

export default Api