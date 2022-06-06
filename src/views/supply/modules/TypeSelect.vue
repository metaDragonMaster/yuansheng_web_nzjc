<template>
	<ul class="type-select">
		<li class="header flex-center">
			<img src="@/assets/iconImages/icon-menu-all.png" alt="" />
			<span>所有分类</span>
		</li>
		<li v-for="(item,index) in list" :key="index" :class="{'active':active == index}" @click="active = index">
			<p>{{item.title}}</p>
		</li>
	</ul>
</template>
<script>
export default {
	data(){return{
		active:0,
		list:[
			{
				title:"全部"
			},
			{
				title:"种子",
			},
			{
				title:"有机农药",
			},
			{
				title:"有机肥",
			},
			{
				title:"农机具",
			},
			{
				title:"农业服务",
			},
		]
	}},
	components: {
		
	},
	mounted() {
		
	},
	methods:{
		
	}
}
</script>
<style  lang="scss" scoped="scoped">
.type-select {
	display: flex;
	
	li {
		color: #FFFFFF;
		position: relative;
		padding: 10px 40px 10px 52px;
 		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: #303030;
			z-index: -1;
			transform: rotateZ(10deg) skew(-10deg,-10deg);
			transform-origin:0 100%;
		}
		&.active,
		&:not(.header):hover {
			&::after {
				background-color: #FFD400;
			}
		}
		&.active {
			color: #333333;
		}
	}
	.header {
		width: 262px;
		img {
			width: 24px;
			height: 15px;
			margin-right: 10px;
		}
	}
}
</style>
