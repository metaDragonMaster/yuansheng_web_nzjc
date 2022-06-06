<template>
	<div class="goods-detail-top flex">
		<div class="detail-top-left">
			<pic-zoom :url="info.goodsImageList[showImgIndex]" class="left-bigimg" :scale="3"></pic-zoom>
			<div class="left-goodsimg-list">
				<el-scrollbar style="width: 100%;">
					<el-image
						:src="item"
						fit="cover"
						class="goods-imgitem"
						v-for="(item, index) in info.goodsImageList"
						:key="index"
						:class="{ hoverActive: index == showImgIndex }"
						@mouseover="imgHover(index)"
					></el-image>
				</el-scrollbar>
			</div>
		</div>
		<div class="detail-top-right">
			<p class="right-title">{{ info.goodsName }}</p>
			<div v-if="hoverMsg == 'purchase'">
				<div class="goods-content">
					<div class="goods-classMsg flex">
						<div style="min-width: 80px;">产地</div>
						<div>{{ info.productAddress }}</div>
					</div>
					<div class="goods-classMsg flex">
						<div style="min-width: 80px;">规格</div>
						<div>{{ info.goodsModel }}</div>
					</div>
				</div>
			</div>
			<div v-if="hoverMsg == 'supply'">
				<div class="goods-content">
					<div class="goods-classMsg flex">
						<div style="min-width: 80px;">需求数量</div>
						<div>{{ info.goodsNum }}{{ info.unit }}</div>
					</div>
					<div class="goods-classMsg flex">
						<div style="min-width: 80px;">需求时间</div>
						<div>{{ info.endTime }}</div>
					</div>
					<div class="goods-classMsg flex">
						<div style="min-width: 80px;">收货地址</div>
						<div>{{ info.detailAddress }}</div>
					</div>
				</div>
			</div>
			<div class="goods-buy">
				<el-button @click="doHover">{{ btnName }}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import PicZoom from 'vue-piczoom';
export default {
	name: 'goodsDetailTop',
	props: {
		goodsId: {
			type: Number,
			default: ''
		},
		hoverMsg: {
			type: String,
			default: ''
		},

		info: {
			type: Object,
			default: () => {}
		}
	},
	components: {
		PicZoom
	},
	data() {
		return {
			btnName: '',
			showImgIndex: 0,
			isActive: 0
		};
	},
	created() {
		switch (this.hoverMsg) {
			case 'purchase':
				this.btnName = '加入购物车';
				break;
			case 'supply':
				this.btnName = '我要供货';
				break;
		}
	},
	methods: {
		imgHover(index) {
			this.showImgIndex = index;
		},
		doHover() {
			// todo 判断是从 我要供货 还是 我要采购
			let name = this.hoverMsg == 'purchase' ? '/purchase/purchaseOrder' : '/supply/supplyOrder';
			console.log(this.$route.query.current);
			let params = {
				hover: this.hoverMsg,
				name: this.info.goodsName,
				id: this.goodsId,
				unit: this.info.unit,
				showType: this.$route.query.showType,
				current: this.$route.query.current

				// goodsName: this.info.goodsName,
				// productAddress: this.info.productAddress,
				// goodsModel: this.info.goodsModel,
				// endTime: this.info.endTime,
				// detailAddress: this.info.detailAddress,
				// goodsNum: this.info.goodsNum,
				// unit: this.info.unit,
				// goodsImageList: this.info.goodsImageList[0],
				// goodsImageList1: this.info.goodsImageList[1],
				// goodsImageList2: this.info.goodsImageList[2],
				// goodsImageList3: this.info.goodsImageList[3],
				// goodsImageList4: this.info.goodsImageList[4],
				// type: this.info.goodsDetail[2].value,
			};
			this.$routerUtil.toPath(name, params);
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-detail-top {
	height: 500px;
	// margin-top: 20px;
	background-color: #ffffff;
	padding: 40px 80px 40px 40px;

	.detail-top-left {
		flex: 3;

		.left-bigimg {
			width: 350px;
			height: 350px;

			::v-deep img {
				height: 100%;
				object-fit: cover;
			}
		}

		.left-goodsimg-list {
			width: 350px;
			margin-top: 20px;
			white-space: nowrap;

			//display: inline-block;
			.goods-imgitem {
				width: 50px;
				height: 50px;
				cursor: pointer;
				margin-right: 25px;
			}

			.goods-imgitem:last-child {
				margin-right: 0px;
			}

			.hoverActive {
				border: 2px #069b87 solid;
			}
		}

		::v-deep .el-scrollbar__wrap {
			overflow-x: auto;
			padding-bottom: 20px;
			height: calc(100% + 20px); //多出来的20px是横向滚动条默认的样式
		}
	}

	.detail-top-right {
		flex: 7;
		margin-left: 35px;

		.right-title {
			color: #333333;
			font-size: 16px;
			font-weight: bold;
			line-height: 35px;
		}

		.goods-content {
			margin-top: 20px;
			min-height: 210px;

			.goods-classMsg {
				color: #666666;
				font-size: 14px;
				margin-top: 30px;

				span:nth-child(2) {
					margin-left: 50px;
				}
			}
		}

		.goods-buy {
			.el-button {
				width: 160px;
				height: 48px;
				background-color: $ThemeColor;
				color: white;
				font-size: 16px;
			}
		}
	}
}
</style>
