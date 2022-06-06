<template>
	<div class="component-type-menu">
		<!-- <div class="header">
			<img src="@/assets/iconImages/icon-menu-all.png" alt="" />
			<span>所有分类</span>
		</div> -->
		<ul>
			<li v-for="item in menuData" :key="item.id" class="menu-item" :class="{ 'is-active': menuActive == item.id }">
				<div class="menu-item-head"  @click="selectMenuCurrent(item)">
					<img class="menu-icon" :src="item.icon" alt="" />
					<div class="menu-title flex-center-js-sb">
						<span>{{ item.title }}</span>
						<i :class="[ 'icon-arrow' ,menuActive == item.id?'el-icon-arrow-down':'el-icon-arrow-right']"></i>
					</div>
				</div>
				<ol class="sub-type-list">
					<li v-for="subType in item.subTypeList" :class="{'color-active': subActive == subType.id}"
					 @click="selectSubCurrent(subType)"
					>{{ subType.title }}</li>
				</ol>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			menuActive: '',
			subActive: '',
			menuData: [
				{
					id: '1',
					icon: require('@/assets/imgs/models/type-menu-1.png'),
					title: '蔬菜',
					subTypeList: [{ id: '2', title: '萝卜' }, { id: '3', title: '白菜' }, { id: '4', title: '娃娃菜' }, { id: '5', title: '大葱' }, { id: '6', title: '木薯' }]
				},
				{
					id: '7',
					icon: require('@/assets/imgs/models/type-menu-2.png'),
					title: '农产',
					subTypeList: [{ id: '8', title: '鸡肉' }, { id: '9', title: '鸭肉' }, { id: '10', title: '大猪蹄' }, { id: '11', title: '水稻' }, { id: '12', title: '高粱' }]
				},
				{
					id: '13',
					icon: require('@/assets/imgs/models/type-menu-3.png'),
					title: '水产',
					subTypeList: [
						{ id: '14', title: '小龙虾' },
						{ id: '15', title: '海鲜礼盒' },
						{ id: '16', title: '生蚝' },
						{ id: '17', title: '大闸蟹' },
						{ id: '18', title: '草鱼' }
					]
				},
				{
					id: '19',
					icon: require('@/assets/imgs/models/type-menu-4.png'),
					title: '农副加工',
					subTypeList: [{ id: '20', title: '腊肉' }, { id: '21', title: '烧鹅' }, { id: '22', title: '普洱茶' }, { id: '23', title: '黑茶' }, { id: '24', title: '绿茶' }]
				},
				{
					id: '25',
					icon: require('@/assets/imgs/models/type-menu-5.png'),
					title: '水果',
					subTypeList: [
						{ id: '26', title: '西瓜' },
						{ id: '27', title: '哈密瓜' },
						{ id: '28', title: '火龙果' },
						{ id: '29', title: '猕猴桃' },
						{ id: '30', title: '橙子' }
					]
				},
				{
					id: '31',
					icon: require('@/assets/imgs/models/type-menu-4.png'),
					title: '调味品',
					subTypeList: [
						{ id: '32', title: '山茶油' },
						{ id: '33', title: '花生油' },
						{ id: '34', title: '味精' },
						{ id: '35', title: '鸡精' },
						{ id: '36', title: '八角' },
						{ id: '37', title: '茴香' }
					]
				}
			]
		};
	},
	components: {},
	mounted() {},
	methods: {
		selectMenuCurrent(item) {
			if(!item.id) return;
			if(item.id == this.menuActive) {
				this.menuActive = ''
			} else {
				this.menuActive = item.id
			}
			console.log(item)
		},
		selectSubCurrent(item) {
			if(!item.id) return;
			if(item.id == this.subActive) {
				this.subActive = ''
			} else {
				this.subActive = item.id
			}
			console.log(item)
		},
	}
};
</script>
<style lang="scss" scoped="scoped">
.component-type-menu {
	background-color: #fff;
	box-shadow: 0px 8px 19px 3px rgba(0, 0, 0, 0.06);
	padding-bottom: 26px;
	.header {
		display: flex;
		align-items: center;
		height: 84px;
		padding-left: 16px;
		img {
			width: 24px;
			height: 15px;
			margin-right: 10px;
		}
		span {
			font-size: 20px;
		}
	}
	.menu-item-head {
		display: grid;
		grid-template-columns: 58px auto;
		cursor: pointer;
		.menu-icon {
			display: inline-block;
			width: 22px;
			height: 22px;
			margin: 10px 15px;
		}
		.menu-title {
			padding: 10px 10px 10px 0;
			span ,
			.icon-arrow {
				font-weight: bold;
			}
		}
	}
	.sub-type-list {
		padding-left: 58px;
		display: flex;
		flex-wrap: wrap;
		font-size: 12px;
		line-height: 16px;
		height: 16px;
		overflow: hidden;
		transition: all 1s;
		li {
			margin-right: 10px;
			margin-bottom: 10px;
			cursor: pointer;
		}
		.color-active {
			color: #61D061;
		}
	}
	.menu-item.is-active{
		
		.sub-type-list{
			height: inherit;
		}
	} 
}
</style>
