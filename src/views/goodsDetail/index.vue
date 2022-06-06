<template>
	<div id="goods-detail" class="limit-max-width">
		<!--<div class="goods-detail-flow">-->
		<!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
		<!--<el-breadcrumb-item :to="{path:routerPath,query:{current:$route.query.current,showType:$route.query.showType}}">{{routerTitle}}</el-breadcrumb-item>-->
		<!--<el-breadcrumb-item>{{routerSecond}}</el-breadcrumb-item>-->
		<!--</el-breadcrumb>-->
		<!--</div>-->
		<goods-detail-top :goodsId="goodsId" :hoverMsg="hoverMsg" :info="info"></goods-detail-top>
		<goods-detail-bottom :info="info"></goods-detail-bottom>
	</div>
</template>

<script>
import goodsDetailTop from '@/views/goodsDetail/modules/goodsDetailTop.vue';
import goodsDetailBottom from '@/views/goodsDetail/modules/goodsDetailBottom';
import ApiAuth from '@/api/auth.js';

export default {
	components: {
		goodsDetailTop,
		goodsDetailBottom
	},
	data() {
		return {
			routerTitle: '',
			routerSecond: '',
			routerPath: '',
			goodsId: '',
			hoverMsg: '',
			info: {
				goodsImageList: [],
				goodsDetail: [],
				goodsName: '',
				productAddress: '',
				goodsModel: '',
				goodsNum: '',
				endTime: '',
				detailAddress: '',
				unit: ''
			}
		};
	},
	created() {
		this.goodsId = Number(this.$route.query.id);
		let changeHover = this.$route.query.fromMsg;
		window.scrollTo(0, 0);
		switch (changeHover) {
			case 'purchase':
				this.routerTitle = '我要采购';
				this.routerSecond = '商品详情';
				this.routerPath = '/purchase';
				this.cgdetail();
				break;
			case 'supply':
				this.routerTitle = '我要供货';
				this.routerSecond = '需求详情';
				this.routerPath = '/supply';
				this.ghdetail();
				break;
		}

		this.hoverMsg = changeHover;
	},
	methods: {
		async ghdetail() {
			let res = await ApiAuth.ghdetail(this.goodsId);
			console.log(res.data);
			if (res.code == 10200) {
				this.info = res.data;
			}
		},

		async cgdetail() {
			let res = await ApiAuth.cgdetail(this.goodsId);
			console.log(res.data);
			if (res.code == 10200) {
				this.info = res.data;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#goods-detail {
	background-color: #f4f5f9;
	padding-bottom: 30px;
	padding-top: 20px;
	.goods-detail-flow {
		font-size: 14px;
		color: #333333;
		padding-top: 20px;
	}
}
</style>
