<template>
	<div id="purchase">
		<Banner></Banner>
		<!-- <div class="limit-max-width no-goods-body">
			<TypeSelect :selects="selects" sendText="发布需求"></TypeSelect>
			<div class="grid-col-5">
				<GoodCard
					v-for="item in 10"
					:key="item"
					introduce="农用撒肥车干湿两用大棚均匀施肥农用机器全自动农用撒肥车干湿两用大棚均匀施肥农用机器全自动"
					price="75.3"
					address="湖南 常德"
					buttonText="立即采购"
					tip="成交 2333次"
				></GoodCard>
			</div>
			<TablePagination skew align="center" :size="size" :current="current" :total="100" layout="prev, pager, next"></TablePagination>
		</div> -->
		<div class="limit-max-width">
			<!-- 类型选择按钮 -->
			<div class="flex-js-sb select-buttons">
				<TypeSelect></TypeSelect>
				<div class="send-button flex-center">
					<i class="icon el-icon-plus"></i>
					<p>发布需求</p>
				</div>
			</div>
			<el-row :gutter="14">
				<el-col :span="5">
					<!-- 类型选择菜单 -->
					<TypeMenu></TypeMenu>
					<div class="current-season">
						<p class="h-1">当季需求</p>
						<ul class="grid-col-2">
							<li class="infor-card" v-for="item in 4">
								<img src="@/assets/imgs/models/good-image.png" alt="" />
								<p class="title font-hide-2">农用撒肥车干湿两用大棚均匀施 农用撒肥车干湿两用大棚均匀施</p>
								<p class="flex-js-sb">
									<span>农用机器</span>
									<span>湖南 常德</span>
								</p>
							</li>
						</ul>
					</div>
				</el-col>
				<el-col :span="19">
					<el-table
						:data="tableData"
						v-loading="tableLoading"
						tooltip-effect="dark"
						:header-cell-style="{ textAlign: 'center', 'background-color': '#f9f9f9', color: '#333333' }"
						:cell-style="{ textAlign: 'center' }"
					>
						<el-table-column label="商品" porp="image" width="160px">
							<template v-slot="{ row }">
								<img :src="row.image" alt="图片加载失败" />
							</template>
						</el-table-column>
						<el-table-column>
							<template v-slot="{ row }" prop="info">
								<div class="flex-column-js-sb text-align-left">
									<p>{{ row.info.p }}</p>
									<span>{{ row.info.span }}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="品牌" prop="brand" width="150px"></el-table-column>
						<el-table-column label="产地" prop="address" width="150px"></el-table-column>
						<el-table-column label="操作" width="180px">
							<template v-slot="{ row }">
								<payButton>立即采购</payButton>
							</template>
						</el-table-column>
					</el-table>
					<TablePagination align="center" :size="size" :current="current" :total="100" layout="prev, pager, next"></TablePagination>
				</el-col>
			</el-row>
		</div>
		<img class="footer-image" src="@/assets/imgs/models/footer.png" alt="" />
	</div>
</template>
<script>
import Banner from './modules/banner.vue';
import GoodCard from '@/components/goodCard.vue';
import TypeMenu from '@/components/TypeMenu/index.vue';
// import TypeSelect from '@/components/typeSelect.vue';
import TypeSelect from './modules/TypeSelect.vue';
import TablePagination from '@/components/TablePagination/index.vue';
import payButton from '@/components/payButton.vue';
export default {
	data() {
		return {
			size: 10,
			current: 1,
			selects: [
				{
					id: 0,
					text: '全部'
				},
				{
					id: 1,
					text: '种子'
				},
				{
					id: 2,
					text: '有机农药'
				},
				{
					id: 3,
					text: '有机肥'
				},
				{
					id: 4,
					text: '农机具'
				},
				{
					id: 5,
					text: '农业服务'
				}
			],
			tableData: [
				{
					id: '1',
					image: require('@/assets/imgs/purchase/good.png'),
					info: {
						p: '微耕机柴油汽油旋耕机松土机锄草机除草机小型拖拉机农用机械田园翻地机起垄耕地机农机犁地机',
						span: '这里显示型号规格'
					},
					brand: '蓝翔',
					address: '常德市'
				},
				{
					id: '2',
					image: require('@/assets/imgs/purchase/good.png'),
					info: {
						p: '微耕机柴油汽油旋耕机松土机锄草机除草机小型拖拉机农用机械田园翻地机起垄耕地机农机犁地机',
						span: '这里显示型号规格'
					},
					brand: '蓝翔',
					address: '常德市'
				}
			],
			tableLoading: false,
		};
	},
	components: {
		Banner,
		GoodCard,
		TypeMenu,
		TypeSelect,
		TablePagination,
		payButton
	},
	computed: {},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped="scoped">
#purchase {
	.grid-col-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 8px;
	}
	.current-season {
		.h-1 {
			padding: 8px 0;
		}
	}
	.text-align-left {
		text-align: left;
		p {
			margin-bottom: 64px;
		}
	}
	.infor-card {
		padding: 6px;
		font-size: 12px;
		border-radius: 10px;
		box-shadow: 0px 0px 19px 3px #eeeeee;
		img {
		}
		.title {
			margin-bottom: 12px;
			margin-top: 4px;
		}
		span {
			color: #666666;
		}
	}
	.button-success {
		background-color: #4bc427;
		color: #ffffff;
		width: 100%;
		height: 36px;
		border-radius: 10rem;
	}
	.select-buttons {
		margin-top: 15px;
		padding-right: 20px;
	}
	.el-table {
		margin-top: 25px;
	}
	.send-button {
		width: 156px;
		position: relative;
		padding-left: 12px;
		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: #303030;
			z-index: -1;
			transform: rotateZ(10deg) skew(-10deg, -10deg);
			transform-origin: 0 100%;
		}
		.icon {
			background-color: #fff;
			border-radius: 50%;
			padding: 2px;
			font-weight: bold;
			font-size: 14px;
		}
		p {
			color: #fff;
			padding-left: 10px;
			margin-top: -2px;
		}
	}
	.footer-image {
		margin-top: 120px;
	}
}
</style>
