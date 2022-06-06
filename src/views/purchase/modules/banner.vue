<template>
	<div class="banner-view limit-max-width">
		<img src="@/assets/imgs/purchase/banner/banner-bg.png" alt="" class="bg-img" />
		<div class="bg-mask"></div>
		<div class="banner-title">
			<div>
				<h1>
					<span>原生认证</span>
					<span>质量保证</span>
				</h1>
				<p>NATIVE CERTIFICATION QUALITY ASSURANCE</p>
				<span></span>
			</div>
		</div>
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
.banner-view {
	height: 500px;
	position: relative;
	overflow: hidden;
	.bg-img {
		min-width: 1920px;
		min-height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}
	.bg-mask {
		width: 62%;
		height: 100%;
		background-image: linear-gradient(
			105deg,
			#008e39,
			#008e39 70%,
			rgba($color: #008e39, $alpha: 0.5) 70%,
			rgba($color: #008e39, $alpha: 0.5) 80%,
			transparent 80%,
			transparent
		);
		// clip-path: polygon(0 0, 100% 0%, 81% 100%, 0 100%);
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		animation: start 2s;
		@keyframes start {
			from {
				width: 100%;
				// clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%);
			}

			to {
				width: 62%;
				// clip-path: polygon(0 0, 100% 0%, 81% 100%, 0 100%);
			}
		}
	}
	.banner-title {
		color: #ffffff;
		height: 100%;
		display: grid;
		align-items: center;
		transition: opacity 1s;
		animation: startopacity 1s;
		@keyframes startopacity {
			from {
				opacity: 0;
				margin-top: -10px;
			}
			to {
				opacity: 1;
			}
		}
		h1 {
			font-size: 70px;
			padding-bottom: 16px;
			span {
				padding-right: 36px;
			}
		}
		p {
			font-size: 24px;
		}
		p + span {
			width: 170px;
			height: 6px;
			background-color: #ffd400;
			display: inline-block;
			margin-top: 46px;
		}
	}
}
</style>
