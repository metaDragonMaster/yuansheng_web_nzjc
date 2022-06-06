<template>
	<div class="view limit-max-width">
		<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我要采购</el-breadcrumb-item>
			<el-breadcrumb-item>订单信息</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<div class="good-model-title"><p>订单信息</p></div>
			<el-table :data="tableData" header-cell-class-name="header-cell">
				<el-table-column prop="goodInfo" label="产品信息">
					<template v-slot="{ row }">
						<div class="info-card">
							<img src="" alt="" />
							<div class="flex-column-js-sard">
								<p>{{ row.goodInfo.title }}</p>
								<span>{{ row.goodInfo.type }}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="goodNo" label="订单编号" width="240" align="center"></el-table-column>
				<el-table-column prop="num" label="数量" width="240" align="center"></el-table-column>
				<el-table-column prop="price" label="金额" width="240" align="center">
					<template v-slot="{ row }">
						<span class="price-color">{{ row.price }}</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="good-model-title"><p>支付方式</p></div>
			<el-radio-group v-model="radio" class="radio-select">
				<el-radio :label="3"><img src="../../assets/imgs/payment/1.png" alt="" /></el-radio>
				<el-radio :label="6"><img src="../../assets/imgs/payment/2.png" alt="" /></el-radio>
				<el-radio :label="9"><img src="../../assets/imgs/payment/3.png" alt="" /></el-radio>
			</el-radio-group>
			<p class="pay-mach">
				<span>支付金额：</span>
				<span class="price-color">
					￥
					<span class="big-size">99.00</span>
				</span>
			</p>
			<button class="submit-button">确认付款</button>
		</el-card>
	</div>
</template>
<script>
import EasyBreadCrumb from '@/components/EasyBreadCrumb/index.vue';
import ApiNzjcGh from '@/api/nzjcsystemGh.js';
export default {
	data() {
		return {
			// payType: '',
			// goodsTitleImage:'',
			// payAmount: '',
			// payMethod: [],
			// ghInfoId: '',
			// goodsName: ''
			radio: 3,
			tableData: [
				{
					goodInfo: {
						img: '',
						title: '老东北大米',
						type: '粮食作物'
					},
					goodNo: '23124141423213213',
					num: '20',
					price: '99.00'
				}
			]
		};
	},
	components: {
		EasyBreadCrumb
	},
	created() {
		// let orderInfo = this.$route.params;
		// if (orderInfo && orderInfo.ghInfoId) {
		// 	console.log(orderInfo)
		// 	let { goodsTitleImage, payAmount, payMethod, ghInfoId, goodsName } = orderInfo;
		// 	this.goodsTitleImage = goodsTitleImage;
		// 	this.payAmount = payAmount;
		// 	this.payMethod = payMethod;
		// 	this.ghInfoId = ghInfoId;
		// 	this.goodsName = goodsName;
		// } else {
		// 	this.$message.error('订单号错误');
		// 	this.$routerUtil.toPath('/supply/releaseSource');
		// }
	},
	methods: {
		// async ghInfoPayDj(ghInfoId) {
		// 	let res = await ApiNzjcGh.ghInfoPayDj(ghInfoId);
		// 	if (res.code == 10200) {
		// 		this.$routerUtil.newWindow(res.data.body, '_blank');
		// 	} else {
		// 		this.$message.warning(res.msg);
		// 	}
		// }
		// this.ghInfoPayDj(res.data);
	}
};
</script>
<style lang="scss" scoped="scoped">
.view {
	padding-bottom: 135px;

	.breadcrumb {
		margin: 1rem 0;
	}

	::v-deep .el-card .el-card__body {
		padding: 0;
	}

	.el-card {
		padding-bottom: 154px;
	}

	.good-model-title {
		height: 75px;
		line-height: 75px;

		p {
			padding-left: 48px;
			position: relative;

			&::after {
				content: '';
				display: block;
				width: 40px;
				height: 4px;
				background-color: #008e39;
				margin-top: -4px;
			}
		}
	}

	.good-info {
	}

	::v-deep .header-cell {
		background-color: #f1f1f1;

		&:first-child {
			padding-left: 38px;
		}
	}

	.info-card {
		display: grid;
		grid-template-columns: 132px auto;
		grid-column-gap: 20px;
		margin-left: 38px;

		img {
			width: 132px;
			height: 132px;
		}

		span {
			color: #999999;
		}
	}

	.price-color {
		color: #ff4300;
	}

	.radio-select {
		// #008E39
		padding: 40px 0 40px 48px;
		width: 100%;
		border-top: 1px solid #f3f3f3;
		border-bottom: 1px solid #f3f3f3;
		::v-deep .is-checked .el-radio__inner {
			border-color: #008e39;
			background: #008e39;
		}
		.el-radio {
			margin-right: 100px;
		}
	}

	.pay-mach {
		padding-left: 48px;
		margin-top: 40px;
		.price-color {
			font-size: 20px;
		}

		.big-size {
			font-size: 40px;
		}
	}

	.submit-button {
		margin-left: 48px;
		margin-top: 50px;
		background-color: #008e39;
		color: #ffffff;
		width: 194px;
		height: 56px;
		font-size: 20px;
	}
}
</style>
