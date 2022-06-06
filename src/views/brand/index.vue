<template>
	<div class="brand-view">
		<Banner></Banner>
		<div class="model-title">大牌推荐</div>
		<Recommend></Recommend>
		<Cooperation></Cooperation>
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
					<div class="step step-1">
						<div class="content left"><div class="circle left-circle"></div></div>
						1
						<div class="content right"><div class="circle right-circle"></div></div>
					</div>
					<p>第一步</p>
					<span>联系平台，原生标准认证</span>
				</li>
				<li>
					<div class="step step-2">
						<div class="content left"><div class="circle left-circle"></div></div>
						2
						<div class="content right"><div class="circle right-circle"></div></div>
					</div>
					<p>第二步</p>
					<span>签订入驻合约</span>
				</li>
				<li>
					<div class="step step-3">
						<div class="content left"><div class="circle left-circle"></div></div>
						3
						<div class="content right"><div class="circle right-circle"></div></div>
					</div>
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
import Cooperation from "./modules/cooperation.vue"
import GoodCard from '@/components/goodCard.vue';
export default {
	data() {
		return {};
	},
	components: {
		Banner,
		GoodCard,
		Recommend,
		Cooperation,
	},
	mounted() {},
	methods: {}
};
</script>

<style scoped lang="scss">
.brand-view {
	.model-title {
		font-size: 38px;
		text-align: center;
		margin: 80px 0 40px 0;
		&.left {
			text-align: left;
		}
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
		.model-title {
			padding-top: 20px;
			margin-top: 0;
		}
		.step-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			place-items: center;
			padding: 50px 0;
			text-align: center;
			li:not(:last-child) {
				.step {
					&::before ,
					&::after {
						content: '';
						display: block;
						margin-top: -6px;
						position: absolute;
						top: 50%;
					}
					&::after {
						right: -230%;
						width: 154px;
						margin-top: - 4px;
						border-top: 8px dotted #FFFFFF;
					}
					&::before {
						right: calc(-230% - 18px);
						top: calc(50% + 1px);
						border-radius: 50%;
						width: 10px;
						height: 10px;
						background-color: #FFFFFF;
						
					}
				}
			}
			.step {
				font-size: 38px;
				border: 2px solid #ffd400;
				border-radius: 50%;
				line-height: 110px;
				height: 110px;
				width: 110px;
				margin: 0 auto;
				position: relative;
				margin-bottom: 20px;

				.content {
					position: absolute;
					width: 60px;
					height: 120px;
					top: -6px;
					margin: 0;
					padding: 0;
					overflow: hidden;
				}

				.circle {
					position: absolute;
					margin: 0;
					width: 120px;
					height: 120px;
					border-radius: 50%;
					border: 10px solid transparent;
					// transform: rotate(135deg);
					transition: all 0.3s;
				}
				.left {
					left: -6px;
				}
				.right {
					transform: rotate(180deg);
					right: -6px;
				}

				.left-circle {
					border-top-color: #ffd400;
					border-left-color: #ffd400;
					// transform: rotate(45deg);
					// animation: circle-left 5s linear infinite;
				}

				.right-circle {
					border-bottom-color: #ffd400;
					border-right-color: #ffd400;
					// animation: circle-right 5s linear infinite;
				}

				&.step-1 {
					.left-circle {
						transform: rotate(135deg);
					}
					.right-circle {
						transform: rotate(75deg);
					}
				}

				&.step-2 {
					.left-circle {
						transform: rotate(-175deg);
					}
					.right-circle {
						transform: rotate(135deg);
					}
				}
				&.step-3 {
					.left-circle {
						transform: rotate(-45deg);
					}
					.right-circle {
						transform: rotate(135deg);
					}
				}
			}

			.step + p {
				font-size: 22px;
			}
		}
	}
}
</style>
