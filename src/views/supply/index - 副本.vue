<template>
	<div id="supply">
		<div class="banner limit-max-width">
			<div class="banner-title flex-column-center">
				<h1>赋能合作社 集团采购</h1>
				<p class="hr"></p>
				<h4>ENABLING COOPERATIVE GROUP PROCUREMENT</h4>
			</div>
		</div>
		<el-row class="limit-max-width" id="anchor" ref="Anchor">
			<div class="table-select limit-max-width-inset">
				<div class="flex sticky">
					<EasySlidSelect
						:list="tableTypeList"
						ref="EasySlidSelect"
						class="easySlidSelect"
						@change="
							info => {
								changeselect(info);
							}
						"
					></EasySlidSelect>
					<el-button size="small" class="release" @click="sendGoods()">发布货源</el-button>
				</div>

				<el-table
					:data="showData"
					v-loading="isLoading"
					ref="TableDom"
					:key="itemKey"
					:header-cell-style="{ textAlign: 'center', 'background-color': '#F9F9F9' }"
					:cell-style="{ textAlign: 'center' }"
					stripe
				>
					<el-table-column label="需求产品" width="200px">
						<template v-slot="{ row }">
							<div class="table-select-tips"><img :src="row.goodsInfoImage" @click="operationclick(row.cgInfoId)" /></div>
						</template>
					</el-table-column>
					<el-table-column label="" width="400px">
						<template v-slot="{ row }">
							<div class="table-select-tips">
								<div style="width: 336px;">
									<p @click="operationclick(row.cgInfoId)">{{ row.goodsName }}</p>
									<span>{{ row.goodsModel }}</span>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="goodsNum" label="需求数量">
						<template v-slot="{ row }">
							{{ row.goodsNum + row.unit }}
						</template>
					</el-table-column>
					<el-table-column prop="endTime" label="需求时间"></el-table-column>
					<el-table-column label="操作">
						<template v-slot="{ row }">
							<button class="operationbtn" @click="operationclick(row.cgInfoId)">我要供货</button>
						</template>
					</el-table-column>
				</el-table>
				<TablePagination
					:total="tableQueryOption.total"
					:size="tableQueryOption.size"
					:current="tableQueryOption.current"
					layout="prev, pager, next,jumper"
					@currentChange="
						val => {
							tableQueryOption.current = val;
							getTableData();
						}
					"
					@sizeChange="
						val => {
							tableQueryOption.size = val;
							getTableData();
						}
					"
				/>
			</div>
		</el-row>
		<!-- <div class="limit-max-width" style="padding-bottom: 2.75rem;"></div> -->
	</div>
</template>
<script>
import EasySlidSelect from '@/components/EasySlidSelect/index.vue';
import TablePagination from '@/components/TablePagination/index.vue';
import ApiAuth from '@/api/auth.js';
import scrollToMixin from "../../utils/scrollToMixin.js";

export default {
	mixins:[scrollToMixin],
	data() {
		return {
			itemKey: '0',
			tableTypeList: [
				{
					goodsType: '种子'
				},
				{
					goodsType: '有机农药'
				},
				{
					goodsType: '有机肥'
				},
				{
					goodsType: '农机具'
				},
				{
					goodsType: '农业服务'
				}
			],
			isLoading: false,
			//总数据
			tableData: [
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/zz/bc/1a.jpg'),
						goodsName: '水晶冰菜种子四季室内阳台盆栽特色蔬菜非洲冰草种籽爽口原厂彩包',
						goodsModel: '爽口原厂彩包',
						goodsNum: 5,
						unit: '包',
						cgInfoId: 11,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/zz/bc/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/zz/bc/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/zz/bc/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/zz/bc/1e.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/zz/gl/1a.jpg'),
						goodsName: '甘蓝种子苗包心菜籽高产大田种植卷心菜大头菜春秋季夏播蔬菜种子',
						goodsModel: '迈金优春丰牛心甘蓝200粒1袋',
						goodsNum: 15,
						unit: '袋',
						cgInfoId: 12,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/zz/gl/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/zz/gl/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/zz/gl/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/zz/gl/1e.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/zz/hld/1a.jpg'),
						goodsName: '荷兰豆种子甜脆大荚春秋种植蔬菜易种无纤维种籽菜豌豆菜籽种',
						goodsModel: '荷兰豆10克',
						goodsNum: 5,
						unit: '袋',
						cgInfoId: 13,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/zz/hld/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/zz/hld/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/zz/hld/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/zz/hld/1e.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/zz/hd/1a.jpg'),
						goodsName: '黄豆种子 农田当季结荚饱满大豆黄豆籽',
						goodsModel: '威亚中黄13黄豆拆袋一公斤',
						goodsNum: 5,
						unit: '袋',
						cgInfoId: 14,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/zz/hd/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/zz/hd/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/zz/hd/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/zz/hd/1e.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/zz/xc/1a.jpg'),
						goodsName: '香菜种子香菜籽芫荽籽蔬菜种子批发菜种菜籽种子公司四季播种',
						goodsModel: '1kg/袋',
						goodsNum: 5,
						unit: '袋',
						cgInfoId: 15,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/zz/xc/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/zz/xc/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/zz/xc/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/zz/xc/1e.jpg')
					}
				],
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/ny/ny/0.jpg'),
						goodsName: '包邮25%环嗪酮 250g 秒刻达杀树剂除草灭灌杀树农药',
						goodsModel: '250g一瓶',
						goodsNum: 1,
						unit: '瓶',
						cgInfoId: 21,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ny/ny/1.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ny/ny/2.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ny/ny/3.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ny/ny/4.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/ny/ccj/0.jpg'),
						goodsName: '谷庆欢46%二甲灭草松水稻矮慈姑三棱草鸭舌草异形莎草除草剂农药',
						goodsModel: '100克/瓶',
						goodsNum: 1,
						unit: '瓶',
						cgInfoId: 22,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ny/ccj/1.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ny/ccj/2.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ny/ccj/3.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ny/ccj/4.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/ny/nyffj/0.jpg'),
						goodsName: '农药防腐剂 杀菌剂 农药防腐剂液体肥防腐剂稳定高效KS-122',
						goodsModel: '25kg一桶',
						goodsNum: 1,
						unit: '瓶',
						cgInfoId: 23,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ny/nyffj/1.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ny/nyffj/2.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ny/nyffj/3.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ny/nyffj/4.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/ny/scj/0.jpg'),
						goodsName: '螺虫乙酯·噻嗪酮蚧壳虫白粉虱蚜虫锈壁虱持效杀虫剂农药',
						goodsModel: '200g*5瓶',
						goodsNum: 1,
						unit: '瓶',
						cgInfoId: 24,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ny/scj/1.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ny/scj/2.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ny/scj/3.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ny/scj/4.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/ny/scj2/0.jpg'),
						goodsName: '3%甲维盐杀虫剂农药杀虫甲氨基阿维菌素苯甲酸盐蔬菜农药',
						goodsModel: '30ml一瓶',
						goodsNum: 1,
						unit: '瓶',
						cgInfoId: 25,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ny/scj2/1.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ny/scj2/2.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ny/scj2/3.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ny/scj2/4.jpg')
					}
				],
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/fl/1a.jpg'),
						goodsName: 'NAT有机肥',
						goodsModel: '500克/袋',
						goodsNum: 9,
						unit: '袋',
						cgInfoId: 31,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/fl/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/fl/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/fl/1d.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/fl/2a.jpg'),
						goodsName: 'NATURAL有机肥',
						goodsModel: '20kg/袋',
						goodsNum: 1,
						unit: '袋',
						cgInfoId: 32,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/fl/2b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/fl/2c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/fl/2d.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/fl/3a.jpg'),
						goodsName: '微量元素水溶肥',
						goodsModel: '20kg/袋',
						goodsNum: 3,
						unit: '袋',
						cgInfoId: 33,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/fl/3b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/fl/3c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/fl/3d.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/fl/4a.jpg'),
						goodsName: '高端营养有机肥',
						goodsModel: '20kg/袋',
						goodsNum: 5,
						unit: '袋',
						cgInfoId: 34,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/fl/4b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/fl/4c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/fl/4d.jpg')
					}
				],
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/njj/kgj/1a.jpg'),
						goodsName: '厂家供应多功能小型四轮履带式座驾式微耕机除草旋耕机松土耕地机',
						goodsModel: '二冲程3.8马力配开沟刀松土刀除草轮',
						goodsNum: 1,
						unit: '台',
						cgInfoId: 41,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/njj/kgj/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/njj/kgj/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/njj/kgj/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/njj/kgj/1e.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/njj/qcj/1a.jpg'),
						goodsName: '厂家供应双圆盘小四轮玉米收割机小型农用苞米秸秆青储回收机',
						goodsModel: '履带地滚刀青储机',
						goodsNum: 1,
						unit: '台',
						cgInfoId: 42,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/njj/qcj/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/njj/qcj/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/njj/qcj/1d.jpg'),
						goodsImageList4: require('@/assets/images/testimg/njj/qcj/1e.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/njj/stj/1a.jpg'),
						goodsName: '微耕机 农用汽油小型旋耕机翻土机 多功能除草机田园管理机',
						goodsModel: '四冲松土+除草',
						goodsNum: 1,
						unit: '台',
						cgInfoId: 43,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/njj/stj/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/njj/stj/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/njj/stj/1d.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/njj/tlj/1a.jpg'),
						goodsName: '小型家用脱粒机 全自动玉米大豆高梁菜籽苞谷水稻谷子剥撕皮',
						goodsModel: '小型家用脱粒机',
						goodsNum: 1,
						unit: '台',
						cgInfoId: 44,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/njj/tlj/1b.jpg'),
						goodsImageList2: require('@/assets/images/testimg/njj/tlj/1c.jpg'),
						goodsImageList3: require('@/assets/images/testimg/njj/tlj/1d.jpg')
					}
				],
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/nyfw/cy1.jpg'),
						goodsName: '插秧',
						goodsModel: '10亩地',
						goodsNum: 10,
						unit: '亩',
						cgInfoId: 51,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/nyfw/cy2.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/nyfw/ld.jpg'),
						goodsName: '犁地',
						goodsModel: '10亩地',
						goodsNum: 10,
						unit: '亩',
						cgInfoId: 52,
						endTime: '2021-8-17',
						detailAddress: '常德'
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/nyfw/ny1.jpg'),
						goodsName: '农药',
						goodsModel: '10亩地',
						goodsNum: 10,
						unit: '亩',
						cgInfoId: 53,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/nyfw/ny2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/nyfw/ny3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/nyfw/ny4.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/nyfw/zm1.jpg'),
						goodsName: '种苗',
						goodsModel: '10亩地',
						goodsNum: 10,
						unit: '亩',
						cgInfoId: 54,
						endTime: '2021-8-17',
						detailAddress: '常德'
					}
				]
			],
			showData: [],
			showType: 0,
			tableQueryOption: {
				total: 10,
				current: 1,
				size: 10
			}
		};
	},
	components: {
		EasySlidSelect,
		TablePagination
	},
	computed: {},
	mounted() {
		this.ghlist();
		this.ghGoodsTypeList();
	},
	methods: {
		submit() {},

		//更新数据
		getTableData() {
			this.ghlist();
			this.$routerUtil.toPath('/supply', { showType: this.showType, current: this.tableQueryOption.current });
		},

		//翻页
		changeselect(info) {
            this.showType = this.tableTypeList[info.index];
			this.tableQueryOption.current = 1;
			this.tableQueryOption.total = this.tableData.length;
			this.getTableData();
		},

		//进入详情页
		operationclick(index) {
			let url = '/#/goodsDetail/index?';
			let message = {
				// goodsInfo
				fromMsg: 'supply',
				id: index,
				showType: this.showType,
				current: this.tableQueryOption.current
			};
			for (var i in message) {
				if (message[i] != undefined) {
					url += i + '=' + message[i] + '&';
				}
			}
			url = url.substring(0, url.length - 1).replace('%', '-');
			this.$routerUtil.newWindow(url, '_blank');
		},

		//发布货源
		sendGoods() {
			this.$routerUtil.toPath('/supply/releaseSource', {
				showType: this.showType,
				current: this.tableQueryOption.current
			});
		},

		async ghlist() {
			let current = this.tableQueryOption.current;
			let size = this.tableQueryOption.size;
			let goodsTypeId = this.showType;

			let res;
			if ((goodsTypeId = -1)) {
				res = await ApiAuth.ghlist({
					current,
					size
				});
			} else {
				res = await ApiAuth.ghlist({
					current,
					size,
					goodsTypeId
				});
			}

			// let res = await this.$store.dispatch('user/ghlist', );
			console.log(res.data);
			if (res.code == 10200) {
				this.tableQueryOption.total = res.data.total;
				this.showData = res.data.records;
			}
		},

		async ghGoodsTypeList() {
			let res = await ApiAuth.ghGoodsTypeList();
			// let res = await this.$store.dispatch('user/cglist',);
			console.log(res.data);
			if (res.code == 10200) {
				this.tableTypeList = [
					{
						goodsType: '全部',
						goodsTypeId: -1
					}
				];
				this.tableTypeList = this.tableTypeList.concat(res.data);
				// this.tableTypeList = res.data;
			}
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
#supply {
	background-color: #f2f3f5;
}

.banner {
	background-image: url(../../assets/images/supply/banner_woyaogh.png);
	//height: 15.375rem;
	height: 350px;
	.banner-title {
		height: 100%;
		color: #ffffff;
		padding-right: 40rem;

		h1 {
			font-size: 3.75rem;
			display: inline-block;
			margin-bottom: 20px;
			text-shadow: 0 0.085rem 0.11rem #000000;
		}

		.hr {
			height: 0.125rem;
			background-color: rgba($color: #ffffff, $alpha: 0.2);
			width: 34.65rem;
			margin-bottom: 20px;
			//box-shadow: 0 0.105rem 0.15rem #000000;
		}

		h4 {
			font-size: 1.375rem;
			font-weight: 500;
		}
	}
}

.el-row.limit-max-width {
	padding-top: 1.875rem;
	padding-bottom: 1.875rem;
	min-height: 800px;
}

.table-select {
	background-color: #ffffff;
	padding: 0 1rem 1rem 1rem;
	position: relative;
	.easySlidSelect {
		width: 880px;
	}
	.sticky {
		position: sticky;
		top: 38px;
		left: 0;
		background-color: #ffffff;
		z-index: 100;
	}

	.release {
		width: 90px;
		height: 36px;
		margin: 10px 20px 0 auto;
		background-color: $ThemeColor;
		color: white;
	}

	.table-select-tips {
		display: flex;
		flex-direction: row;
		height: 121px;

		img {
			height: 120px;
			width: 120px;
			cursor: pointer;
			margin: 0 auto;
		}

		div {
			position: relative;
			width: 336px;
			p {
				margin-left: 20px;
				margin-top: 10px;
				text-align: left;
				font-weight: bold;
				color: #333333;
				cursor: pointer;
			}

			span {
				position: absolute;
				bottom: 10px;
				left: 20px;
				color: #999999;
				text-align: left;
			}
		}
	}

	.operationbtn {
		background-color: #ffffff;
		border: $ThemeColor 1px solid;
		border-radius: 2px;
		color: $ThemeColor;
		width: 90px;
		height: 36px;

		&:hover {
			background-color: $ThemeColor;
			color: #ffffff;
		}
	}
}

.shop-from {
	background-color: #ffffff;
	padding: 0 1rem 1rem 1rem;

	h4 {
		font-size: 1.5rem;
		padding: 1rem 0;
		font-weight: 500;
	}

	button {
		width: 100%;
		background-color: $ThemeColor;
		color: #ffffff;
		padding: 0.75rem;
	}
}
</style>
