export default {
	mounted(){
		this.scrollTo();
	},
	methods:{
		scrollTo() {
			this.$nextTick(()=>{
				let top = this.$refs['Anchor'].$el.offsetTop - 10;
				// let top = this.$refs['Anchor'].$el.offsetTop - 50;
				window.scrollTo({
					top: top,
					behavior: 'smooth'
				});
			})
		},
	}
}