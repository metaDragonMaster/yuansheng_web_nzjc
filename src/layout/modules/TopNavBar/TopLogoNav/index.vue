<template>
	<div id="top-logo-nav" >
		<div class="ysl-logo flex-center-js-sb">
			<img src="@/assets/images/topnavbar/ysl-logo.png" alt="" @click="toRouteYuanshenl" />
			<p>农资集采平台</p>
		</div>
		<div class="nav-search" drift-right>
			<div class="border-input">
				<!-- <img class="nav-search-icon" src="@/assets/iconImages/icon_search.png" alt=""> -->
				<el-icon class="nav-search-icon el-icon-search"></el-icon>
				<input class="nav-search-input" type="text" placeholder="输入产品类型/名称/规格进行搜索" />
			</div>
			<button class="nav-search-button">搜索</button>
		</div>
		<button class="shop-cart-button flex-center" @click="shoppingcar">
			<img src="@/assets/iconImages/icon_shoppingcar.png" />
			<span>购物车</span>
			<i>({{ shopCartNum }})</i>
		</button>
	</div>
</template>
<script>
import setting from '@/utils/setting.js';
import ApiAuth from '@/api/auth.js';
import { mapActions,mapGetters } from 'vuex'
import {
    getToken
} from "@/utils/auth";

export default {
	data() {
		return {
			num: 0
		};
	},
	components: {},
	computed: {
		...mapGetters(['shopCartNum']),
	},
	mounted() {
		this.shopCartList();
		// this.num = JSON.parse(localStorage.getItem('nzjcshopcar')).length;
	},
	methods: {
		toRouteYuanshenl() {
			this.$routerUtil.newWindow(setting.officialWebsiteUrl, '_media');
		},

		shoppingcar() {
		    if(!getToken()){
                this.$message({
                    type: "warning",
                    message: "请登录",
                })
				return;
			}

			this.$routerUtil.toName('shopCart');
			// this.$routerUtil.t(process.env.VUE_APP_BASE_WEBURL + 'shopCart', true)
		},

		async shopCartList() {
			let res = await ApiAuth.shopCartList();
			// let res = await this.$store.dispatch('user/shopCartList');
			// if (res.code == 10200) {
			// 	this.num = res.data.length;
			// }
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
#top-logo-nav {
	display: flex;
	align-items: center;
	padding-top: 1rem;
	padding-bottom: 1rem;
	.ysl-logo {
		// color: $ThemeColor;
		img {
			width: 7.125rem;
			margin-right: 1rem;
			cursor: pointer;
		}
		p {
			padding-left: 1rem;
			line-height: 1.25rem;
			font-size: 1.375rem;
			border-left: 0.125rem solid #dddddd;
			color: $ThemeColor;
		}
	}
	.nav-search {
		height: 2.5rem;
		display: flex;
		align-items: center;
		.border-input {
			height: 100%;
			border: 0.0625rem solid $ThemeColor;
			border-right: 0;
			display: flex;
		}
		.nav-search-icon {
			width: 0.875rem;
			height: 0.875rem;
			margin: 0.675rem 0.5rem 0.5rem 0.5rem;
		}
		.nav-search-input {
			border: 0;
			height: 100%;
			width: 18.75rem;
		}
		.nav-search-button {
			padding: 0 2.5rem;
			height: 100%;
			color: #ffffff;
			background-color: $ThemeColor;
		}
	}
	.shop-cart-button {
		// width: 6.875rem;
		// height: 2.5rem;
		border: 1px #d9d9d9 solid;
		padding: 0.625rem 1rem;
		margin-left: 1rem;
		img {
			width: 1rem;
			height: 0.875rem;
			margin-right: 2px;
		}
		i {
			color: $ThemeColor;
		}
	}
}
</style>
