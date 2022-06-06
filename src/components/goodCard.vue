<template>
	<div class="goodCard">
		<img class="image" src="@/assets/imgs/purchase/good.png" alt="图片加载失败">
		<!-- <img class="image" :src="image" alt="图片加载失败"> -->
		<p class="introduce font-hide-2">{{introduce}}</p>
		<div class="flex-center-js-sb">
			<p class="price">
				<span>{{price}}</span>
				元/包
			</p>
			<p class="address">{{address}}</p>
		</div>
		<div class=" flex-center-js-sb">
			<pay-button>{{buttonText}}</pay-button>
			<span class="tip font-hide">{{tip}}</span>
		</div>
	</div>
</template>
<script>
import payButton from "@/components/payButton.vue";
export default {
	components:{
		payButton,
	},
	props: {
		// image: require('@/assets/imgs/purchase/good.png'),
		// image: '@/assets/imgs/purchase/good.png',
		introduce:{
			type:String,
			default:'',
			// default:'农用撒肥车干湿两用大棚均匀施肥农用机器全自动农用撒肥车干湿两用大棚均匀施肥农用机器全自动'
		},
		price:{
			type:String,
			default:'',
			// default:'79.5'
		},
		address:{
			type:String,
			default:'',
			// default:'湖南 常德'
		},
		buttonText:{
			type:String,
			default:'',
			// default:'立即采购'
		},
		tip:{
			type:String,
			default:'',
			// default:'成交 35222次'
		},
	},
	methods:{
		clickImage(e) {
			this.$emit('clickImage',e)
		},
		clickButton(e) {
			this.$emit('clickButton',e)
		},
		clickCard(e) {
			this.$emit('clickCard',e)
		}
	}
}
</script>
<style  lang="scss" scoped="scoped">
.goodCard {
	border: 1px solid #DDDDDD;
	padding: 16px;
	.image {
		width: 228px;
		height: 228px;
	}
	.introduce {
		margin-top: 12px;
	}
	.flex-center-js-sb {
		margin-top: 16px;
	}
	.price {
		span {
			font-size: 24px;
		}
	}
	.tip ,
	.address {
		font-size: 12px;
		color: #666666;
		max-width: 80px;
		text-align: right;
	}
}
</style>
