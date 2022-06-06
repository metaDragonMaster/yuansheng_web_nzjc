<template>
	<el-pagination
		:class="{
			'skew-pagination':skew == true,
			'right':align == 'right',
			'center':align == 'center',
			'left':align == 'left',
		}"
		:layout="layout"
		:total="total"
		:page-size="size"
		:page-sizes="sizes"
		:current-page="current"
		@current-change="currentChange"
		@size-change="sizeChange"
	></el-pagination>
</template>
<script>
export default {
	data() {return {
	}},
	props:{
		align:{
			type:String,
			default:'right',
			validator(value) {
				return ['right','center','left'].includes(value);
			}
		},
		skew:{
			type:Boolean,
			default:false
		},
		total :{
			type:Number,
			default:0
		},
		current :{
			type:Number,
			default:1
		},
		size:{
			type:Number,
			default:10
		},
		sizes: {
			type:Array,
			default:()=>[10]
		},
		layout:{
			type:String,
			default:"total, sizes, prev, pager, next, jumper"
		}
	},
	methods:{
		currentChange(val) {
			this.$emit("currentChange",val);
		},
		sizeChange(val) {
			this.$emit("sizeChange",val);
		}
	}
}
</script>
<style  lang="scss" scoped="scoped">
.el-pagination {
	width: fit-content;
}
.left {
	margin:1rem 0 ;
}
.center {
	margin:1rem auto ;
}
.right {
	margin:1rem 1rem 0 auto ;
}
.skew-pagination {
	::v-deep button[type="button"],
	::v-deep .el-pager > li {
		width: 38px;
		height: 38px;
		line-height: 36px;
		// clip-path: polygon(20% 0, 100% 0%, 80% 100%, 0 100%);
		// border: 1px solid #E0DFDF;
		position: relative;
		margin-right: 4px;
		background-color: transparent;
		color: #999999;
		font-weight: 500;
		&::after {
			content: "";
			display: block;
			width: 92%;
			height: 92%;
			position: absolute;
			top: 0;
			left: 0;
			border: 1px solid #E0DFDF;
			// background-color: transparent;
			// background-color: #FFD400;
			z-index: -1;
			transform: rotateZ(15deg)skew(-15deg,-15deg);;
		}
	}
	::v-deep .el-pager > li:hover,
	::v-deep .el-pager > li.active{
		color: #008E39;
	}
	::v-deep .el-pager > li.active::after {
		background-color: #FFD400;
	}
	::v-deep .btn-prev {
		padding-right: 6px;
	}
	::v-deep .btn-next {
		padding-left: 6px;
	}
}
</style>
