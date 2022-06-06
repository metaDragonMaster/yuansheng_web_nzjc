<template>
	<div class="view limit-max-width">
		<EasyBreadCrumb limit :breads="breads"></EasyBreadCrumb>
		<el-card class="card">
			<div class="flex-js-sb">
				<img class="goods-image" :src="goodsTitleImage" alt="">
				<h4>{{ goodsName }}</h4>
				<span class="price">￥{{ payAmount }}</span>
			</div>
			<el-divider></el-divider>
			<div class="select-payment">
				<span>支付方式:</span>
				<el-radio-group v-model="payType">
					<el-radio v-for="item in payMethod" :key="item.payMethodId" :label="item.payMethodId">{{ item.payMethodName }}</el-radio>
				</el-radio-group>
			</div>
			<el-divider></el-divider>
			<div class="flex-center-js-sard">
				<span class="drift-right">支付金额:</span>
				<span class="price">￥{{ payAmount }}</span>
				<button class="submit-button" @click="ghInfoPayDj(ghInfoId)">确认付款</button>
			</div>
		</el-card>
	</div>
</template>
<script>
import EasyBreadCrumb from '@/components/EasyBreadCrumb/index.vue';
import ApiNzjcGh from '@/api/nzjcsystemGh.js';
export default {
	data() {
		return {
			payType: '',
			breads: [
				{
					label: '采购单'
				},
				{
					label: '支付'
					// to: "/customerService"
				}
			],
			goodsTitleImage:'',
			payAmount: '',
			payMethod: [],
			ghInfoId: '',
			goodsName: ''
		};
	},
	components: {
		EasyBreadCrumb
	},
	created() {
		let orderInfo = this.$route.params;
		if (orderInfo && orderInfo.ghInfoId) {
			console.log(orderInfo)
			let { goodsTitleImage, payAmount, payMethod, ghInfoId, goodsName } = orderInfo;
			this.goodsTitleImage = goodsTitleImage;
			this.payAmount = payAmount;
			this.payMethod = payMethod;
			this.ghInfoId = ghInfoId;
			this.goodsName = goodsName;
		} else {
			this.$message.error('订单号错误');
			this.$routerUtil.toPath('/supply/releaseSource');
		}
	},
	methods: {
		async ghInfoPayDj(ghInfoId) {
			let res = await ApiNzjcGh.ghInfoPayDj(ghInfoId);
			if (res.code == 10200) {
				this.$routerUtil.newWindow(res.data.body, '_blank');
			} else {
				this.$message.warning(res.msg);
			}
		}
		// this.ghInfoPayDj(res.data);
	}
};
</script>
<style lang="scss" scoped="scoped">
.view {
	$color: #f22d24;
	// background-color: #F9F9F9;
	.card {
		padding: 80px 100px;
		margin-bottom: 50px;
		.flex-js-sb h4 {
			width: 600px;
		}
		.goods-image {
			width: 200px;
		}
	}
	.submit-button {
		margin-left: 50px;
		height: 48px;
		width: 160px;
		background-color: $color;
		color: #ffffff;
		border-radius: 2px;
	}
	.price {
		color: $color;
	}
	.flex-center-js-sard .drift-right {
		color: #666666;
		font-size: 14px;
	}
	.flex-center-js-sard .price {
		font-size: 24px;
	}
	.select-payment {
		padding: 50px 0;
		& > span {
			font-size: 14px;
			padding-right: 20px;
		}
	}
	::v-deep .el-radio.is-checked {
		.el-radio__input.is-checked .el-radio__inner {
			border-color: $color;
			background-color: $color;
		}
		.el-radio__input.is-checked + .el-radio__label {
			color: $color;
		}
	}
}
</style>
