<template>
	<div class="banner-view limit-max-width">
		<img src="@/assets/imgs/purchase/banner/banner-bg.png" alt="" class="bg-img">
		<div class="bg-mask"></div>
		<div class="banner-title">
			<div>
				<p class="h-1">农资品牌馆</p>
				<p class="h-2">为您的农业生产保驾护航</p>
				<ul class="h-3">
					<li>种子</li>
					<li>化肥</li>
					<li>农药</li>
					<li>农具</li>
					<li>农机</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){return{
		
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
.banner-view {
	height: 400px;
	position: relative;
	overflow: hidden;
	.bg-img {
		min-width: 1920px;
		min-height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: -1;
	}
	.bg-mask {
		width: 62%;
		height: 100%;
		background-image: linear-gradient(
			105deg,
			#008E39,
			#008E39 70%,
			rgba($color:#008E39,$alpha:0.5) 70%,
			rgba($color:#008E39,$alpha:0.5) 80%,
			transparent 80%,
			transparent
		);
		// clip-path: polygon(0 0, 100% 0%, 81% 100%, 0 100%);
		position: absolute;
		left:0;
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
		color: #FFFFFF;
		height: 100%;
		display: grid;
		align-items: center;
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
		.h-1 {
			font-size: 70px;
		}
		.h-2 {
			font-size: 28px;
		}
		.h-3 {
			display: flex;
			margin-top: 30px;
			li {
				margin-right: 40px;
				list-style: disc;
				list-style-position: inside;
			}
		}
	}
}
</style>
