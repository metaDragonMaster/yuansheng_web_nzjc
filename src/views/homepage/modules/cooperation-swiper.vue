<template>
	<div class="grid-center">
		<ul class="cooperation-swiper">
			<li v-for="(item,index) in dataList" :key="index">
				<img :src="item" alt="">
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data(){return{
		dataList:[
			require("@/assets/imgs/homepage/cooperation-swiper/1.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/2.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/3.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/4.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/5.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/6.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/7.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/8.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/9.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/10.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/11.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/12.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/13.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/14.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/15.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/16.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/17.png"),
			require("@/assets/imgs/homepage/cooperation-swiper/18.png"),
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
.grid-center {
	display: grid;
	place-items: center;
}
.cooperation-swiper {
	display: grid;
	grid-template-columns: repeat(6,205px);
	grid-row-gap: 18px;
	li {
		img {
			height: 100px;
			width: 205px;
		}
	}
}
</style>
