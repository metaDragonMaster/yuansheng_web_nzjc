<template>
	<div class="easy-bread-crumb">
		<el-breadcrumb :separator="separator">
			<el-breadcrumb-item to="/homepage">
				首页
			</el-breadcrumb-item>
			<el-breadcrumb-item v-for="item in breadList" :to="item.to" :key="item.label">
				{{item.label}}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script>
export default {
	data(){return{
		breadList:[
			// {
			// 	to:"homepage",
			// 	label:"首页"
			// },
		],
	}},
	watch:{
		$route(route) {
			this.startbreadList()
		}
	},
	props:{
		separator:{
			type:String,
			default:"/"
		},
		breads:{
			type:Array,
			default:()=>[],
		},
		// disableNames:{
		// 	type:Array,
		// 	default:()=>['/homepage'],
		// },
	},
	created() {
		// console.log(this.$route.matched)
		this.startbreadList()
	},
	methods:{
		startbreadList() {
			if(this.breads != []) {
				// console.log("startbreadList breads",this.breads)
				this.breadList = this.breads;
				// console.log('breadList',this.breadList)
				return ;
			} else {
				let matched = this.$route.matched;
				this.breadList = [];
				matched.map((item,index)=> {
					if(index != 0) {
						// console.log(item.name)
						this.breadList.push({
							// to:item.name,
							label:item.meta.title,
						})
					}
				})
			}
		}
	}
}
</script>
<style  lang="scss" scoped="scoped">
.easy-bread-crumb {
	padding: 1rem;
}
</style>
