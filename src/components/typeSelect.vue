<template>
	<ul class="type-select">
		<li v-for="item in selects" :class="{'active':active==item.id}" @click="select(item)">
			{{item.text}}
		</li>
		<li class="send-button" @click="send($event)">
			<i class="icon el-icon-plus"></i>
			{{sendText}}
		</li>
	</ul>
</template>
<script>
export default {
	data(){return{
		active:0
	}},
	props:{
		selects:{
			type:Array,
			default:()=>[],
		},
		sendText:{
			type:String,
			default:''
		}
	},
	components: {
		
	},
	mounted() {
		
	},
	methods:{
		select(item) {
			this.active = item.id;
			this.$emit('select',item)
		},
		send($event) {
			this.$emit('send',$event);
		}
	}
}
</script>
<style  lang="scss" scoped="scoped">
.type-select {
	display: flex;
	justify-content: center;
	li {
		color: #FFFFFF;
		position: relative;
		padding: 8px 45px;
		font-size: 20px;
		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: #303030;
			z-index: -1;
			transform: rotateZ(10deg) skew(-10deg,-10deg);;
		}
		&.active,
		&:hover {
			&::after {
				background-color: #FFD400;
			}
		}
		&.active {
			color: #333333;
		}
	}
	.send-button {
		margin-left: 32px;
		display: flex;
		align-items: center;
		padding: 8px 30px;
		.icon {
			width: 18px;
			height: 18px;
			line-height: 18px;
			text-align: center;
			margin-right: 10px;
			font-size: 14px;
			border-radius: 50%;
			background-color: #FFFFFF;
			color: #333333;
		}
	}
}
</style>
