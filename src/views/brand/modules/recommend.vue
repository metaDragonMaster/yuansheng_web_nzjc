<template>
	<div class="recommend-view limit-max-width">
		<div class="recommend-card">
			<div class="banner">
				<img class="banner-image" src="@/assets/imgs/brand/recommend/recommend-banner.png" alt="" />
				<div class="banner-card">
					<p class="h-1">常德原生农业有限公司</p>
					<p class="h-2">原生农业致力打造农业规范，高水平，高发展，搭建企业与农民之间的桥梁服务农业增长，助力产业腾飞</p>
					<p class="h-3">
						相关产品：
						<span>常德香米</span>
					</p>
					<ul class="buttons">
						<li>查看同款商品</li>
						<li>浏览品牌商品</li>
					</ul>
				</div>
			</div>
			<ul class="select-list">
				<li v-for="(item, index) in selectList" :class="{ active: active == index }" @click="active = index"><img :src="item" /></li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selectList: [
				require('@/assets/imgs/homepage/cooperation-swiper/1.png'),
				require('@/assets/imgs/homepage/cooperation-swiper/3.png'),
				require('@/assets/imgs/homepage/cooperation-swiper/5.png'),
				require('@/assets/imgs/homepage/cooperation-swiper/11.png'),
				require('@/assets/imgs/homepage/cooperation-swiper/6.png')
			],
			active: 1
		};
	},
	components: {},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped="scoped">
.recommend-card {
	margin-bottom: 180px;
	.banner {
		height: 360px;
		display: grid;
		grid-template-columns: 480px 1fr;

		.banner-image {
			height: 360px;
		}
		.banner-card {
			background-color: #008e39;
			color: #ffffff;
			padding: 50px 0 0 50px;
			position: relative;
			&::before,
			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				height: 100%;
			}
			&::before {
				width: 90px;
				left: -89px;
				clip-path: polygon(100% 0, 100% 0%, 100% 100%, 0 100%);
				background-color: #008e39;
			}
			&::after {
				width: 180px;
				left: -179px;
				clip-path: polygon(100% 0, 100% 0%, 50% 100%, 0 100%);
				background-color: rgba($color: #53b753, $alpha: 0.4);
			}
		}
		.h-1 {
			font-size: 28px;
		}
		.h-2 {
			margin-top: 16px;
			font-size: 18px;
			width: 620px;
			line-height: 26px;
		}
		.h-3 {
			font-size: 14px;
			margin-top: 16px;
			span {
				font-size: 12px;
				border: 1px solid #fff;
				padding: 2px 4px;
			}
		}
		.buttons {
			display: flex;
			margin-top: 50px;
			li {
				position: relative;
				z-index: 1;
				padding: 8px 16px;
				font-size: 14px;
				margin-left: 10px;
				cursor: pointer;
				&::after {
					content: '';
					display: block;
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					background-color: #303030;
					z-index: -1;
					transform: rotateZ(10deg) skew(-10deg, -10deg);
				}
				&:first-child {
					color: #008e39;
					&::after {
						background-color: #ffffff;
					}
				}
				&:last-child {
					&::after {
						background-color: transparent;
						border: 1px solid #ffffff;
					}
				}
			}
		}
	}
	.select-list {
		// height: 130px;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		background-color: #ffffff;
		box-shadow: 0 0 10px 0 #00c14d;
		li {
			&.active::after {
				content: '';
				display: block;
				width: 100%;
				height: 6px;
				background: linear-gradient(270deg, #dcec90 0%, #53b753 100%);
			}
		}
	}
}
</style>
