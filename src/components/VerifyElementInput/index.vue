<template>
	<el-input v-model="value" clearable class="verify-input" @change="changeValue">
		<template slot="append">
			<div style="min-width: 4.375rem; text-align: center;" @click="appendClick()">
				{{verifyType?`${times}s`:"获取验证码"}}
			</div>
		</template>
	</el-input>
</template>
<script>
export default {
	data(){return{
		times:undefined,
	}},
	computed:{
		verifyType(){
			return !!this.times
		}
	},
	props:{
		value:"",
		maxTimes:{
			type:Number,
			default:300
		}
	},
	model:{
		prop:"value",
		event:"emitValue"
	},
	deactivated() {
		this.times = 0;
	},
	methods:{
		setTimes(){
			this.times = this.maxTimes;
			let time = setInterval(()=>{
				// console.log(this.times)
				--this.times;
				if(this.times<=0) {
					this.times = null;
					clearInterval(time)
				}
			},1000)
		},
		changeValue(el) {
			// console.log(el)
			// console.log(el.target.value)
			// $emit('emitValue',)
		},
		appendClick() {
			// console.log('append click')
			if(this.times>0) return;
			this.setTimes();
		}
	}
}
</script>
<style lang="scss">
.el-input.verify-input { // 验证码的element el-input
	.el-input__inner{
		border-right: 0;
	}
	.el-input-group__append {
		background-color: #FFFFFF;
		position: relative;
		color: #00BF30;
		cursor: pointer;
		&:before {
			content:"|";
			color: #dfdfdf;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			
		}
	}
}
</style>