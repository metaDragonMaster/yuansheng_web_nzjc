<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="$route.path" :unique-opened="true" background-color="#FFFFFF" text-color="#333333" active-text-color="#0DA056" router>
			<template v-for="item in menus">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
								<template slot="title">
									{{ subItem.title }}
								</template>
								<el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
									{{ threeItem.title }}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index" @click="">
						<i :class="item.icon"></i>
						<p slot="title" class="flex-center-js-sb">
							{{ item.title }}
							<i class="side-bar-icon el-icon-arrow-down"></i>
						</p>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
export default {
	// data() {
	// 	return {
	// 		items: [
	// 			{	
	// 				// icon:'',
	// 				index: '/gameManage/index',
	// 				title: '游戏管理',
	// 				subs:[
	// 					{
	// 						icon:'',
	// 						index: '/gameManage/index',
	// 						title: '游戏管理',
	// 					}
	// 				]
	// 			},
	// 		],
	// 	};
	// },
	props:{
		menus:{
			type:Array,
			default:()=>[],
		}
	},
};
</script>
<style type="text/css" lang="scss" >
.sidebar {
	::v-deep .el-menu-item:hover {
		background-color: #F2FFF5 !important;
	}
	.is-active {
		background-color: #F2FFF5;
	}
	// .menu-title {
	// 	display: flex;
	// }
	.side-bar-icon {
		transition: transform .3s ;
		font-size: .75rem;
		color: #909399;
	}
	.is-active .side-bar-icon{
		transform: rotateZ(-90deg);
	}
	::v-deep.el-menu-item .is-active {
		border-left: 0.3125rem solid #0DA056;
	}
}
</style>
<style lang="scss" scoped>

// .sidebar > ul {
// 	height: 100%;
// }

.sidebar::-webkit-scrollbar {
	// width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 220px;
} 
/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
	display: none;
}
/*隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
	// display: none;
}
</style>
