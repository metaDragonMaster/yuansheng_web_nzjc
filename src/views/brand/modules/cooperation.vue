<template>
	<div class="cooperation-view">
		<div class="model-title limit-max-width">合作品牌</div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in cooperList" :key="index">
					<div class="image-box">
						<img :src="item" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper/swiper-bundle.min.js';
import 'swiper/swiper-bundle.min.css';
export default {
	data() {
		return {
			_swiper: undefined,
			cooperList: [
				require("@/assets/imgs/homepage/cooperation-swiper/1.png"),
				require("@/assets/imgs/homepage/cooperation-swiper/2.png"),
				require("@/assets/imgs/homepage/cooperation-swiper/3.png"),
				require("@/assets/imgs/homepage/cooperation-swiper/4.png"),
				require("@/assets/imgs/homepage/cooperation-swiper/5.png"),
				require("@/assets/imgs/homepage/cooperation-swiper/6.png"),
				require("@/assets/imgs/homepage/cooperation-swiper/7.png"),
			]
		};
	},
	components: {},
	mounted() {
		this.swiperInit();
	},
	methods: {
		swiperInit() {
			this._swiper = new Swiper('.swiper-container', {
				el: '.swiper-container',
				loop: true, //循环
				// autoplay : true,
				slidesPerView: 6, //一行显示3个
				spaceBetween: 200, //间隔30
				autoplay: {
					delay: 1000 //自动切换的时间间隔，单位ms
				},
				// navigation: {
				// 	nextEl: '.swiper-button-next',
				// 	prevEl: '.swiper-button-prev'
				// }
				// pagination: {
				// 	//分页符
				// 	el: '.swiper-pagination',
				// 	clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
				// }
			});
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.cooperation-view {
	background-image: url(../../../assets/imgs/brand/cooperation-bg.png);
	height: 410px;
	overflow: hidden;
	position: relative;
	.model-title {
		font-size: 38px;
		text-align: left;
		padding-top: 28px;
		padding-bottom: 20px;
	}
	.swiper-container {
		width: 1920px;
		position: absolute;
		left: 0;
	}
	.image-box {
		width: 284px;
		height: 214px;
		position: relative;
		line-height: 214px;
		// z-index: 1;
		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: #FFF;
			z-index: -1;
			transform: rotateZ(9.5deg) skew(-9.5deg, -9.5deg);
		}
	}
}
</style>
