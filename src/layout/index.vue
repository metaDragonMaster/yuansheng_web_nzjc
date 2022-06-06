<template>
	<div id="layout">
		<div>
			<TopNavBar ref="TopNavBar"></TopNavBar>
			<div ref="AppMain" class="app-main">
			<!-- <div class="app-main" style="min-height:800px"> -->
				<router-view></router-view>
			</div>
		</div>
		<BottomFooter ref="BottomFooter"></BottomFooter>
	</div>
</template>
<script>
import TopNavBar from "./modules/TopNavBar/index.vue";
import BottomFooter from "./modules/BottomFooter/index.vue";
import {mapActions} from "vuex"
export default {
	data(){return{
	}},
	components: {
		TopNavBar,
		BottomFooter
	},
	computed: {
		
	},
    created() {
        this.getUserInfo()
    },
    methods:{
        ...mapActions({'getUserInfo':'user/getUserInfo'}),
        // userConter() {
        // 	// this.$store.actions.user.userConter()
        // 	this.$store.dispatch('user/userConter');
        // }
    }
}
</script>
<style  lang="scss" scoped="scoped">
#layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
