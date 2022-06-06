<template>
	<div id="homepage">
		<Banner></Banner>
		<div class="no-2">
			<div class="filter-box limit-max-width-inset">
				<div class="model-title">
					<p>合作品牌</p>
					<span>AGRICULTURAL STANDAR</span>
				</div>
				<CooperationSwiper></CooperationSwiper>
			</div>
			<div class="banner-fixed">
				<CountTo></CountTo>
			</div>
		</div>
		<div class="no-3 limit-max-width">
			<div class="filter-box">
				<div class="model-title">
					<p>合作品牌</p>
					<span>AGRICULTURAL STANDAR</span>
				</div>
			</div>
			<ul class="flex-js-sb type">
				<li>
					<img src="@/assets/imgs/homepage/index/type-1.png" alt="">
					<p>认证原生农资</p>
				</li>
				<li>
					<img src="@/assets/imgs/homepage/index/type-2.png" alt="">
					<p>商品防伪溯源</p>
				</li>
				<li>
					<img src="@/assets/imgs/homepage/index/type-3.png" alt="">
					<p>互联网赋能</p>
				</li>
			</ul>
			<div class="filter-box">
				<div class="model-title">
					<p>合作品牌</p>
					<span>AGRICULTURAL STANDAR</span>
				</div>
			</div>
			<ul class="flex-js-sb step">
				<li>
					<img src="@/assets/imgs/homepage/index/step-1.png" alt="">
					<p>第一步</p>
					<span>注册账户</span>
				</li>
				<li>
					<img src="@/assets/imgs/homepage/index/step-2.png" alt="">
					<p>第二步</p>
					<span>认证为供应商</span>
				</li>
				<li>
					<img src="@/assets/imgs/homepage/index/step-3.png" alt="">
					<p>第三步</p>
					<span>为合作社集中供货</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Banner from "./modules/banner.vue"
import CountTo from './modules/countTo.vue';
import CooperationSwiper from './modules/cooperation-swiper.vue';
import Swiper from 'swiper/swiper-bundle.min.js';
import 'swiper/swiper-bundle.min.css';

export default {
	data() {
		return {
			
		};
	},
	components: {
		Banner,
		CountTo,
		CooperationSwiper,
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style lang="scss" scoped="scoped">
#homepage {
	.model-title {
		text-align: center;
		p {
			font-size: 38px;
		}
		span {
			color: #008E39;
			font-size: 24px;
		}
	}
	.no-2 {
		padding-top: 88px;
		.model-title {
			padding-top: 30px;
			margin-bottom: 60px;
		}
		.filter-box {
			position: relative;
			z-index: 10;
			height: 560px;
			overflow: hidden;
			&::after {
				content: "";
				display: block;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: -1;
				background-image: linear-gradient(180deg, #f8f8f8 82%,#46b671);
			}
		}
		.banner-fixed {
			position: relative;
			// top: -46px;
			margin-top: -46px;
			height: 260px;
			padding-top: 110px;
			display: grid;
			
			background-repeat: no-repeat;
			background-size: 100%;
			background-image: url(../../assets/imgs/homepage/index/count-to-bg.png);
		}
	}
	.no-3 {
		text-align: center;
		padding-bottom: 80px;
		.model-title {
			margin-top: 88px;
			margin-bottom: 40px;
		}
		li {
			p {
				font-size: 24px;
			}
			span {
				font-size: 20px;
			}
		}
		.flex-js-sb.step > li{
			position: relative;
			&:not(:last-child)::after {
				content: "";
				display: block;
				position: absolute;
				top: 50%;
				left: calc(100% + 40px);
				background: linear-gradient(90deg, rgba(0, 220, 243, 0) 0%, rgba(15, 240, 17, 0.26) 25%, rgba(42, 184, 36, 0.49) 50%, rgba(36, 193, 42, 0.66) 72%, rgba(31, 176, 44, 0.76) 89%, #32B232 100%);
				height: 4px;
				width: 330px;
			}
		}
	}
}
</style>
