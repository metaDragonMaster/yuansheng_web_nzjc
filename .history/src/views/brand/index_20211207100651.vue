<template>
	<div class="brand-view">
		<Banner></Banner>
		<div class="model-title">大牌推荐</div>
		<Recommend></Recommend>
		<div class="model-title">热卖商品</div>
		<div class="grid-col-5 limit-max-width">
			<GoodCard
				v-for="item in 5"
				:key="item"
				introduce="农用撒肥车干湿两用大棚均匀施肥农用机器全自动农用撒肥车干湿两用大棚均匀施肥农用机器全自动"
				price="75.3"
				address="湖南 常德"
				buttonText="立即采购"
				tip="成交 2333次"
			></GoodCard>
		</div>
		<div class="no-4 color-white bg-green limit-max-width">
			<div class="model-title">如何入驻品牌馆</div>
			<ul class="step-list">
				<li>
					<div class="step step-1">1</div>
					<p>第一步</p>
					<span>联系平台，原生标准认证</span>
				</li>
				<li>
					<div class="step step-2">2</div>
					<p>第二步</p>
					<span>签订入驻合约</span>
				</li>
				<li>
					<div class="step step-3">3</div>
					<p>第三步</p>
					<span>提交资料，成功入驻</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Banner from './modules/banner.vue';
import Recommend from './modules/recommend.vue';
import GoodCard from '@/components/goodCard.vue';
export default {
	data() {
		return {

		};
	},
	components: {
		Banner,
		GoodCard,
		Recommend,
	},
	mounted() { },
	methods: {

	}
};
</script>

<style scoped lang="scss">
.brand-view {
	.model-title {
		font-size: 38px;
		text-align: center;
		margin: 80px 0 40px 0;
	}

	.grid-col-5 {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		margin-top: 40px;
		margin-bottom: 110px;
	}

	.bg-green {
		background-color: #008633;
	}

	.color-white {
		color: white;
	}

	.no-4 {
		.step-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			place-items: center;
			padding: 50px 0;
			text-align: center;

			.step {
				font-size: 38px;
				border: 2px solid #ffd400;
				border-radius: 50%;
				line-height: 100px;
				height: 100px;
				width: 100px;
				padding: 20px;
				margin: 0 auto;
				position: relative;
				&::before,
				&::after {
					content: "";
					display: block;
					width: 100%;
					height: 100%;
					position: absolute;
					// left: -10px;
					// top: -10px;
					left: 0;
					top: 0;
					background-color: #ffd400;
					border-radius: 50%;
				}

				&::before {
					clip: rect(0 100px 50px 0);
					// clip-path: circle(30);
				}

				&::after {
					clip: rect(0 100px 100px 50px);
					// clip-path: circle( 50% at 90px 90px);
				}
			}

			.step + p {
				font-size: 22px;
			}
		}
	}
}
</style>
