import request from '@/utils/request'
let Api = {};

//
Api.ghInfoPayDj = function(ghInfoId) {
	return request({
		url: '/nzjcsystem/gh/ghInfoPayDj',
		method: 'post',
		params: {
			'ghInfoId':ghInfoId
		}
	});
}


export default Api;