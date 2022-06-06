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

		<div class="demo">
			<div class="circle-progress">
				<div class="content left">
					<div class="circle left-circle"></div>
				</div>
				<div class="content right">
					<div class="circle right-circle"></div>
				</div>
			</div>
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

	.demo {
		.circle-progress {
			position: relative;
			width: 200px;
			height: 200px;
			border: 1px solid #888;
		}

		.content {
			position: absolute;
			top: 0;
			width: 100px;
			height: 200px;
			margin: 0;
			padding: 0;
			overflow: hidden;
		}

		.left {
			left: 0;
		}

		.right {
			right: 0;
		}

		.circle {
			position: absolute;
			margin: 0;
			width: 200px;
			height: 200px;
			border-radius: 50%;
			border: 20px solid transparent;
			transform: rotate(135deg);
		}

		.left-circle {
			left: 0;
			border-top-color: green;
			border-left-color: green;
			animation: circle-left 5s linear infinite;
		}

		.right-circle {
			right: 0;
			border-bottom-color: green;
			border-right-color: green;
			animation: circle-right 5s linear infinite;
		}
	}
	@keyframes circle-right {
		0% {
			transform: rotate(135deg);
		}

		50%,
		100% {
			transform: rotate(315deg);
		}
	}

	@keyframes circle-left {
		0%,
		50% {
			transform: rotate(135deg);
		}

		100% {
			transform: rotate(315deg);
		}
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
				line-height: 110px;
				height: 110px;
				width: 110px;
				margin: 0 auto;
				position: relative;

				//left
				&::before,
				&::after {
					//right
					content: "";
					display: block;
					position: absolute;
					margin: 0;
					width: 130px;
					height: 130px;
					border-radius: 50%;
					border: 20px solid transparent;
					// transform: rotate(135deg);
					top: -12px;
					left: -10px;
				}

				&::before {
					border-top-color: #ffd400;
					border-left-color: #ffd400;
					animation: circle-left 5s linear infinite;
				}

				&::after {
					border-bottom-color: #ffd400;
					border-right-color: #ffd400;
					animation: circle-right 5s linear infinite;
				}
			}

			// .step {
			// 	font-size: 38px;
			// 	border: 2px solid #ffd400;
			// 	border-radius: 50%;
			// 	line-height: 110px;
			// 	height: 110px;
			// 	width: 110px;
			// 	margin: 0 auto;
			// 	position: relative;

			// 	&::before,
			// 	&::after {
			// 		content: "";
			// 		display: block;
			// 		// width: 100%;
			// 		// height: 100%;
			// 		width: 120px;
			// 		height: 120px;
			// 		position: absolute;
			// 		// left: 0;
			// 		// top: 0;
			// 		left: - 5px;
			// 		top: - 5px;
			// 		border: #ffd400 solid 10px;
			// 		// background-color: #008633;
			// 		// border-radius: 50%;
			// 	}

			// 	&::before {
			// 		clip: rect(0 120px 120px 0);
			// 		// clip-path: circle(30);
			// 	}

			// 	&::after {
			// 		clip: rect(0 120px 120px 60px);
			// 		// clip-path: circle( 50% at 90px 90px);
			// 	}
			// }

			.step + p {
				font-size: 22px;
			}
		}
	}
}
</style>
