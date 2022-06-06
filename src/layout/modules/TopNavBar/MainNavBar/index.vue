<template>
	<div id="main-nav-bar" limit-max-width>
		<MainNavBarUser></MainNavBarUser>
		<SelectMenu :menus="selectMenuList"></SelectMenu>
	</div>
</template>
<script>
import SelectMenu from './modules/SelectMenu/index.vue';
import MainNavBarUser from './modules/MainNavBarUser/index.vue';

export default {
	data() {
		return {
			selectMenuList: [
				{
					label: '用户中心',
					subList: [
						// {
						// 	label: '个人信息',
						// 	toName: 'userInfo'
						// },
						// {
						// 	label: '需求管理',
						// 	toName: 'demandManagement'
						// },
						// {
						// 	label: '订单管理',
						// 	toName: 'orderManagement'
						// },
						// {
						// 	label: '客服中心',
						// 	toName: 'customerService'
						// }
					]
				},
				{
					label: '实力商家',
					subList: [
						// {
						// 	label: '个人信息',
						// 	toName: 'userInfo'
						// },
						// {
						// 	label: '需求管理',
						// 	toName: 'demandManagement'
						// },
						// {
						// 	label: '订单管理',
						// 	toName: 'orderManagement'
						// },
						// {
						// 	label: '客服中心',
						// 	toName: 'customerService'
						// }
					]
				},
				{
					label: '我要入驻',
					subList: [
						// {
						// 	label: '我是合作社',
						// 	toName: 'settledCooperative'
						// },
						// {
						// 	label: '我是农超企',
						// 	toName: 'settledAgriculturalSuperEnterprise'
						// },
						// {
						// 	label: '我是农资商',
						// 	toName: 'settledAgriculturalEnterprise'
						// }
					]
				},
				{
					label: '客服中心',
					subList: [
						// {
						// 	label: '个人信息',
						// 	toName: 'userInfo'
						// },
						// {
						// 	label: '需求管理',
						// 	toName: 'demandManagement'
						// },
						// {
						// 	label: '订单管理',
						// 	toName: 'orderManagement'
						// },
						// {
						// 	label: '客服中心',
						// 	toName: 'customerService'
						// }
					]
				},
				// {
				// 	label: '网站导航',
				// 	subList: [
				// 		{
				// 			label: '个人信息',
				// 			toName: 'userInfo'
				// 		},
				// 		{
				// 			label: '需求管理',
				// 			toName: 'demandManagement'
				// 		},
				// 		{
				// 			label: '订单管理',
				// 			toName: 'orderManagement'
				// 		},
				// 		{
				// 			label: '客服中心',
				// 			toName: 'customerService'
				// 		}
				// 	]
				// }
			]
		};
	},
	components: {
		SelectMenu,
		MainNavBarUser,
	},
	computed: {
		isSign() {
			return this.$store.getters.isSign;
		}
	},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped="scoped">
#main-nav-bar {
	background-color: #F9F9F9;
	color: #999999;
	display: flex;
	min-height: 2.5rem;
	z-index: 1001;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	font-size: 0.75rem;
}
</style>
