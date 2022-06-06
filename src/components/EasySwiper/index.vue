<template>
	<div class="easy-swiper">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">Slide 1</div>
				<div class="swiper-slide">Slide 2</div>
				<div class="swiper-slide">Slide 3</div>
				<div class="swiper-slide">Slide 4</div>
				<div class="swiper-slide">Slide 5</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper/swiper-bundle.min.js';
import 'swiper/swiper-bundle.min.css';
export default {
	data() {
		return {
			timer: undefined,
			_swiper: undefined,
			swiperOption: {
				loop: true, //循环
				pagination: {
					//分页符
					el: '.swiper-pagination',
					clickable:true,//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
					// dynamicMainBullets:3,//动态分页器的主指示点的数量
					// dynamicBullets:true,//
					// dynamicBullets: this.images.length>=5?true:false,//动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
				},
				
			}
		};
	},
	props: {
		images: {
			type: Array,
			default: () => []
		}
	},
	components: {},
	computed: {},
	mounted() {
		this.$nextTick(() => {
			this.swiperInit();
		});
	},
	methods: {
		swiperInit() {
			this._swiper = new Swiper('.swiper-container', this.swiperOption);
		},
		getSwiperRef(){
			return this._swiper;
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.easy-swiper {
	overflow: hidden;
	.swiper-container {
		height: 100%;
		width: 100%;
	}
}
</style>
