<template>
	<div id="purchase">
		<div class="banner limit-max-width">
			<div class="banner-title flex-column-center">
				<h1>原生认证 质量保证</h1>
				<p class="hr"></p>
				<h4>NATIVE CERTIFICATION QUALITY ASSURANCE</h4>
			</div>
		</div>
		<el-row class="limit-max-width" id="anchor" ref="Anchor">
			<div class="table-select limit-max-width-inset">
				<div class="flex sticky">
					<EasySlidSelect
						:list="tableTypeList"
						class="easySlidSelect"
						@change="
							info => {
								changeSelect(info);
							}
						"
						ref="EasySlidSelect"
					></EasySlidSelect>
					<el-button size="small" class="release" @click="sendRelease()">发布需求</el-button>
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
							<div class="table-select-tips"><img :src="row.goodsInfoImage" @click="operationclick(row.ghInfoId)" /></div>
						</template>
					</el-table-column>
					<el-table-column label="" width="400px">
						<template v-slot="{ row }">
							<div class="table-select-tips">
								<div style="width: 336px;">
									<p @click="operationclick(row.ghInfoId)">{{ row.goodsName }}</p>
									<span>{{ row.goodsModel }}</span>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="goodsBrand" label="品牌"></el-table-column>
					<el-table-column prop="productAddress" label="产地"></el-table-column>
					<el-table-column label="操作">
						<template v-slot="{ row }">
							<button class="operationbtn" @click="operationclick(row.ghInfoId)">我要采购</button>
						</template>
					</el-table-column>
				</el-table>

				<TablePagination
					:total="tableQueryOption.total"
					:current="tableQueryOption.current"
					:size="tableQueryOption.size"
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
	</div>
</template>
<script>
import EasySlidSelect from '@/components/EasySlidSelect/index.vue';
import TablePagination from '@/components/TablePagination/index.vue';
import ApiAuth from '@/api/auth.js';
import scrollToMixin from "@/utils/scrollToMixin.js";

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
			tableData: [
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
		this.getTableData();
	},
	methods: {
		getTableData() {
			this.cglist();
			this.cgGoodsTypeList();
			this.$routerUtil.toPath('/purchase', { showType: this.showType, current: this.tableQueryOption.current });
		},

		changeSelect(info) {
            this.showType = this.tableTypeList[info.index].goodsTypeId;
			this.tableQueryOption.current = 1;
			this.tableQueryOption.total = this.tableData.length;
			this.getTableData();
		},

		operationclick(index) {
			let url = '/#/goodsDetail/index?';
			let message = {
				fromMsg: 'purchase',
				id: index
			};

			for (var i in message) {
				if (message[i] != undefined) {
					url += i + '=' + message[i] + '&';
				}
			}

			url = url.substring(0, url.length - 1);
			url = url.replace('%', '-');

			this.$routerUtil.newWindow(url, '_blank');
		},
		sendRelease() {
			this.$routerUtil.toPath('/purchase/release', {
				showType: this.showType,
				current: this.tableQueryOption.current
			});
		},

		async cglist() {
			let current = this.tableQueryOption.current;
			let size = this.tableQueryOption.size;
			let goodsTypeId = this.showType;
			let res;
			console.log(goodsTypeId);
			if (goodsTypeId == -1) {
				res = await ApiAuth.cglist({
					current,
					size
				});
			} else {
				res = await ApiAuth.cglist({
					current,
					size,
					goodsTypeId
				});
			}

			console.log(res.data);
			if (res.code == 10200) {
				this.tableQueryOption.total = res.data.total;
				this.showData = res.data.records;
			}
		},

		async cgGoodsTypeList() {
			let res = await ApiAuth.cgGoodsTypeList();
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
#purchase {
	background-color: #f2f3f5;

	.banner {
		background-image: url(../../assets/images/supply/banner_woyaocg.png);
		//height: 15.375rem;
		height: 350px;

		.banner-title {
			height: 100%;
			color: #069b87;

			h1 {
				font-size: 3.75rem;
				display: inline-block;
				margin-bottom: 20px;
			}

			.hr {
				height: 0.125rem;
				background-color: #069b87;
				opacity: 0.7;
				width: 31.45rem;
				margin-bottom: 20px;
			}

			h4 {
				font-size: 1.375rem;
				font-weight: 500;
			}
		}
	}
	#anchor {
		min-height: 800px;
	}
	.table-select {
		background-color: #ffffff;
		margin-top: 1.875rem;
		margin-bottom: 1.875rem;
		// padding-bottom: 1rem;
		padding: 0 1rem 1rem 1rem;

		.sticky {
			position: sticky;
			top: 38px;
			left: 0;
			background-color: #ffffff;
			z-index: 100;
		}

		.table-box {
			.table-item {
				width: 100px;
			}
		}

		.easySlidSelect {
			width: 880px;
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
					color: #333333;
					font-weight: bold;
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
}
</style>
