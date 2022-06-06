<template>
	<dv-full-screen-container>
		<TopHeader title="区域数据中心"></TopHeader>
		<div class="SelectAddressCascader">
			<label>区域：</label>
			<SelectAddressCascader v-model="address"></SelectAddressCascader>
			<el-button class="query-button">查询</el-button>
		</div>
		<el-row class="content">
			<el-col :span="8"><LeftA1></LeftA1></el-col>
			<el-col :span="16">
				<div class="grid">
					<ChinaMap></ChinaMap>
					<div class="flex-column-js-sb">
						<RightB1></RightB1>
						<RightB2></RightB2>
					</div>
				</div>
				<RightBottomC1></RightBottomC1>
			</el-col>
		</el-row>
	</dv-full-screen-container>
</template>
<script>
import TopHeader from './modules/TopHeader.vue';
import ChinaMap from './modules/region/ChinaMap.vue';
import SelectAddressCascader from '@/components/SelectAddress/cascader.vue';
import LeftA1 from './modules/region/LeftA1.vue';
import RightB1 from './modules/region/RightB1.vue';
import RightB2 from './modules/region/RightB2.vue';
import RightBottomC1 from './modules/region/RightBottomC1.vue';

export default {
	data() {
		return {
			address: ''
		};
	},
	components: {
		TopHeader,
		ChinaMap,
		SelectAddressCascader,
		LeftA1,
		RightB1,
		RightB2,
		RightBottomC1
	},
	computed: {},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped="scoped">
#dv-full-screen-container {
	background-image: url(../../assets/images/dataCenter/bg-1.png);
}
.content {
	padding: 0 1rem;
	& > .el-col:first-child {
		padding-right: 1rem;
	}
}
::v-deep .data-title {
	height: 40px;
	background: linear-gradient(90deg, #0825b7 0%, rgba(1, 180, 255, 0) 100%);
	// margin: 4px;
	position: relative;
	z-index: -1;
	span {
		background: linear-gradient(92deg, #0072ff 0%, #00eaff 0%, #01aaff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 40px;
		padding-left: 1rem;
		font-size: 22px;
	}
}
.SelectAddressCascader {
	margin: 0.5rem auto;
	width: 800px;
	display: grid;
	grid-template-columns: 3rem auto 100px;
	align-items: center;
	label {
		color: #ffffff;
	}
}
::v-deep .query-button {
	background-color: #1ee6e2;
	margin-left: 1rem;
	color: #ffffff;
}
.grid {
	display: grid;
	grid-template-columns: auto 420px;
}
</style>
