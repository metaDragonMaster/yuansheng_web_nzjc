const state = {
	shopCartNum: 0,
}

const mutations = {
	SET_SHOPCART_NUM: (state, number) => {
		state.shopCartNum = number;
	},
}

const actions = {
	async setShopCartNum({
		commit
	}, params) {
		console.log("setShopCartNum---",params)
		commit('SET_SHOPCART_NUM', params)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
