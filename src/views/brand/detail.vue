<template>
	<div class="brand-detail ">
		<div class="brand-detail-bread limit-max-width">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/brand/index' }">品牌馆</el-breadcrumb-item>
				<el-breadcrumb-item>{{ brand }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="brand-detail-body limit-max-width-inset">
			<div class="brand-detail-body-img"></div>
			<!-- <div class="brand-detail-body-logo "><div class="brand-detail-body-logo-img"></div></div> -->
			<img :src="image" alt="" class="logo-image" />
			<div class="brand-detail-body-main">
				<h3>{{ brand }}</h3>
				<div class="cell ">
					<span>所在地区</span>
					<p>{{productAddress}}</p>
				</div>
				<button>主营：{{ industry }}</button>
				<p class="remark">{{ info }}</p>
			</div>
		</div>

		<div class="brand-detail-goods limit-max-width-inset">
			<h4>商品展示</h4>
			<ul class="goods-list">
				<li v-for="(item, index) in commodity" @click="onPurchase(item.ghInfoId)">
					<img :src="item.goodsInfoImage" alt="" style="width: 215px; height: 215px;" />
					<div>
						<h4>
							{{ item.goodsUnitPrice }}
							<span>元/{{ item.unit }}</span>
						</h4>
						<p class="font-hide-2">{{ item.name }}</p>
						<p class="ps">最近成交 {{ item.successTxCount }}次</p>
						<button>我要采购</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Api from '@/api/brandShop.js';

export default {
	name: 'detail',
	data() {
		return {
			brand: '',
			info: '',
			image: '',
			industry: '',
			productAddress:"",
			id: '',

			commodity: [
				/*
					{
						ghInfoId: 12,
						name: '香菜种子香菜籽芫荽籽蔬菜种子批发菜种菜籽种子公司四季播种',
						goodsInfoImage: require('@/assets/images/testimg/zz/xc/1a.jpg'),
						goodsUnitPrice: '15.98',
						successTxCount: '1535',
						unit: '包',
					
						goodsImageList1: require('@/assets/images/testimg/zz/xc/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/zz/xc/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/zz/xc/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/zz/xc/1e.jpg'),
						goodsBrand: '邵氏农业',
						productAddress: '沧州市',
						goodsModel: '家庭园艺用花种子',
						type: '种子'
					},
					{
						ghInfoId: 11,
						name: '甘蓝种子苗包心菜籽高产大田种植卷心菜大头菜春秋季夏播蔬菜种子',
						goodsInfoImage: require('@/assets/images/testimg/zz/gl/1a.jpg'),
						goodsUnitPrice: '1.5',
						successTxCount: '3516',
						unit: '袋',
					
						goodsBrand: '菜菜芽',
						productAddress: '沧州市',
						goodsModel: '迈金优春丰牛心甘蓝200粒1袋',
						goodsImageList1: require('@/assets/images/testimg/zz/gl/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/zz/gl/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/zz/gl/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/zz/gl/1e.jpg'),
						type: '种子'
					},
					{
						ghInfoId: 33,
						name: '微量元素水溶肥',
						goodsInfoImage: require('@/assets/images/testimg/fl/3a.jpg'),
						goodsUnitPrice: '300',
						successTxCount: '1135',
						unit: '袋',
					
						goodsBrand: 'NATURAL',
						productAddress: '常德市',
						goodsModel: '20kg/袋',
						goodsImageList1: require('@/assets/images/testimg/fl/3b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/fl/3c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/fl/3d.jpg'),
						type: '有机肥'
					},
					{
						ghInfoId: 52,
						name: '拖拉机犁地服务',
						goodsInfoImage: require('@/assets/images/testimg/nyfw/ld.jpg'),
						goodsUnitPrice: '3000',
						successTxCount: '135',
						unit: '次',
					
						goodsBrand: '原生犁地',
						productAddress: '常德市',
						goodsModel: '1台',
						type: '农业服务'
					},
					{
						ghInfoId: 54,
						name: '人工喷洒农药服务',
						goodsInfoImage: require('@/assets/images/testimg/nyfw/ny1.jpg'),
						goodsUnitPrice: '3000',
						successTxCount: '351',
						unit: '次',
					
						goodsBrand: '原生农药喷洒',
						productAddress: '常德市',
						goodsModel: '1人',
						type: '农业服务'
					},
					{
						ghInfoId: 53,
						name: '拖拉机喷洒农药服务',
						goodsInfoImage: require('@/assets/images/testimg/nyfw/ny2.jpg'),
						goodsUnitPrice: '700',
						successTxCount: '35',
						unit: '次',
					
						goodsBrand: '原生喷洒农药',
						productAddress: '常德市',
						goodsModel: '1台',
						goodsImageList1: require('@/assets/images/testimg/nyfw/ny3.jpg'),
						goodsImageList2: require('@/assets/images/testimg/nyfw/ny4.jpg'),
						type: '农业服务'
					}
				*/
			]
		};
	},
	async mounted() {
		this.brand = this.$route.query.brand;
		this.info = this.$route.query.info;
		this.image = this.$route.query.image;
		this.productAddress = this.$route.query.productAddress;
		this.industry = this.$route.query.industry;
		this.id = this.$route.query.id;
		// let info = await this.hotGoodsList();
		this.hotGoodsList(this.$route.query.id);
		// this.commodity = await this.hotGoodsList(this.$route.query.id);
	},
	methods: {
		init() {
			
		},
		wantBuy() {
			this.$routerUtil.toName('goodsDetail', { fromMsg: 'purchase' });
		},

		onPurchase(id) {
			// let info;
			// for (let i = 0; i < this.commodity.length; i++) {
			//     if (id == this.commodity[i].ghInfoId) {
			//         info = this.commodity[i];
			//         break;
			//     }
			//
			// }

			let url = '/#/goodsDetail/index?';
			let message = {
				fromMsg: 'purchase',
				id: id
			};

			for (var i in message) {
				if (message[i] != undefined) {
					url += i + '=' + message[i] + '&';
				}
			}

			url = url.substring(0, url.length - 1);

			this.$routerUtil.newWindow(url, '_blank');
		},

		async hotGoodsList(id) {
			let res = await Api.hotGoodsList({ merchantShopId: id });
			if(res.code == 10200) {
				this.commodity = res.data.records;
			}
		}
	},

};
</script>

<style scoped lang="scss">
.brand-detail {
	background-color: #f4f5f9;
	.brand-detail-bread {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.brand-detail-body {
		background-color: #fff;
		.brand-detail-body-img {
			height: 340px;
			background-image: url(../../assets/images/brand/brandBig.png);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: left top;
		}
		.logo-image {
			width: 180px;
			height: 180px;
			margin: -76px auto 0 auto;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.04);
			border-radius: 50%;
			display: block;
		}
		.brand-detail-body-main {
			padding-bottom: 30px;
			h3 {
				font-size: 30px;
				margin-top: 20px;
				margin-bottom: 24px;
				text-align: center;
			}
			button {
				/*background-color: rgba(255,255,255,0.2);*/
				background-color: rgba(242, 45, 36, 0.08);
				padding: 9px 30px;
				color: $ThemeColor;
				margin: 20px auto 0 auto;
				// width: fit-content;
				display: block;
			}
			.remark {
				width: 695px;
				margin: 40px auto 0 auto;
				font-size: 16px;
			}
			.cell {
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					color: #999999;
					margin-right: 20px;
				}
			}
		}
	}

	.brand-detail-goods {
		margin-top: 20px;
		background-color: #fff;
		padding: 30px;
		h4 {
			margin-bottom: 1rem;
		}
		.goods-list {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-gap: 1rem;
			li {
				// &:not(:last-child) {
				// 	margin-right: 1rem;
				// }
				&:hover {
					.ps,
					h4 {
						display: none;
					}
					.font-hide-2 {
						margin-top: 20px;
					}
					button {
						display: block;
					}
				}
				h4 {
					font-size: 18px;
					margin-top: 20px;
					color: $ThemeColor;
					span {
						font-size: 14px;
					}
				}
				.font-hide-2 {
					font-size: 0.875rem;
					margin-top: 12px;
				}
				.ps {
					font-size: 0.75rem;
					margin-top: 12px;
					color: #999999;
				}
				button {
					display: none;
					background-color: $ThemeColor;
					color: #ffffff;
					width: 100%;
					margin-top: 20px;
					padding: 12px;
					border-radius: 4px;
				}
			}
		}
	}
}
</style>
