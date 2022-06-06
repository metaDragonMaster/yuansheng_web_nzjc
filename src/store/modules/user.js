import ApiAuth from '@/api/auth.js';
import $routerUtil from "@/router/util.js"
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

const state = {
    token: getToken(),
    userInfo: null,
    // userName: "abc123456789",
    // isSign: false,
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
    },
}

const actions = {
    async ghtreeGoodsTypeList(commit) {
        console.log('ghtreeGoodsTypeList');
        let res = await ApiAuth.ghtreeGoodsTypeList();
        return res
    },

    async ghgoodsWeightTypeList(commit) {
        console.log('ghgoodsWeightTypeList');
        let res = await ApiAuth.ghgoodsWeightTypeList();
        return res
    },

    async getUserInfo({commit}) {
        console.log(getToken())
        if (getToken()) {
            let res = await ApiAuth.getUserInfo();
			console.log(res)
            if (res.code == 10200) {
                commit('SET_USER_INFO', res.data)
            }
            // console.log(res.data);
            return res
        }
        return 'not token';
    },


    async login({
                    commit
                }, params) {
        // let res = await ApiAccount.login(params);
        // commit('SET_TOKEN', res.data.Authorization)
        // setToken(res.data.Authorization)
        // // console.log(res)
        return res
    },
    async loginPass({
                        commit
                    }, params) {
        // let res = await ApiAccount.loginPass(params);
        // commit('SET_TOKEN', res.data.Authorization)
        // setToken(res.data.Authorization)
        // // console.log(res)
        return res
    },

    // user logout
    logout({
               commit,
               state,
               dispatch
           }) {
        // commit('SET_TOKEN', '')
        // removeToken()
        // $routerUtil.toPath('/login')
    },
    // get user info
    async selectUserInfo({
                             commit,
                             state
                         }) {
        // let {code,data,msg} = await ApiAccount.selectUserInfo();
        // if(code == 10200) {
        // 	console.log(data)
        // 	commit('SET_USER_INFO', data)
        // 	// return data
        // }
    },
    async removeUserInfo({
                             commit,
                             state
                         }) {
        // commit('SET_USER_INFO', null)
        // commit('SET_TOKEN', '')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
