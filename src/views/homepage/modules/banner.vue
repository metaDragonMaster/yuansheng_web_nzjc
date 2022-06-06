<template>
	<div class="banner limit-max-width flex">
		<p class="h-1">互联网赋能采购商直采</p>
		<p class="h-2">数字化、规模化采购模式，助力供需双方降本增效</p>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	components: {},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped="scoped">
.banner {
	height:600px;
	background-image: url(../../../assets/imgs/homepage/index/banner-bg.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	flex-direction: column;
	justify-content: center;
	color: #FFFFFF;
	.h-1 {
		font-size: 52px;
	}
	.h-2 {
		margin-top: 16px;
		font-size: 28px;
		&::after {
			content: "";
			display: block;
			width: 180px;
			height: 4px;
			background-color: #008E39;
			margin-top: 22px;
		}
	}
}
</style>
