<template>
	<div id="release">
		<div class="limit-max-width-inset title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<!--<el-breadcrumb-item :to="{path:'/purchase',query:{showType:$route.query.showType,current:$route.query.current}}">我要采购</el-breadcrumb-item>-->
				<el-breadcrumb-item><a @click="backToUp">商品详情</a></el-breadcrumb-item>
				<el-breadcrumb-item>采购单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="limit-max-width-inset release-form">
			<el-form ref="Form" :model="form" label-width="155px" label-position="right" :rules="rules">
				<el-form-item label="名称" prop="name">
					<span>{{form.name}}</span>
				</el-form-item>
				<el-form-item label="数量" prop="count" style="font-weight: 500;">
					<el-input-number v-model="form.count" :controls="false" :precision="2" placeholder="请输入商品数量"
						@blur="setcount()" :min="0" style="width: 500px;"></el-input-number>
					<span style="margin-left: 10px;">{{this.unit}}</span>
				</el-form-item>
				<!--<el-form-item prop="unit" style="font-weight: 500;margin-left: -145px;">-->
				<!--<el-select v-model="form.unit" placeholder="请选择" style="width: 90px;">-->
				<!--<el-option v-for="item in options" :key="item.goodsWeightTypeId" :label="item.unit"-->
				<!--:value="item.goodsWeightTypeId"></el-option>-->
				<!--</el-select>-->
				<!--</el-form-item>-->

				<!--<div class="flex">-->
				<!---->
				<!--</div>-->

				<el-form-item label="发货时间" prop="data">
					<el-date-picker v-model="form.data" type="date" placeholder="请选择发货时间" format="yyyy-MM-dd"
						value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="需要金融服务">
					<el-radio-group v-model="form.service">
						<el-radio label="true">是</el-radio>
						<el-radio label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="现金支付商品数量" prop="cash">
					<el-input-number v-model="form.cash" :controls="false" :precision="2" placeholder="请输入现金支付商品数量"
						@blur="setcash()" :disabled="form.service==='false'" :min="0.00"></el-input-number>
				</el-form-item>
				<el-form-item label="供应链金融支付" prop="supply">
					<el-input-number v-model="form.supply" :controls="false" :precision="2" placeholder="请输入供应链金融支付商品数量"
						@blur="setsupply()" :disabled="form.service==='false'" :min="0.00"></el-input-number>
				</el-form-item>
				<el-form-item>
					<el-button class="submit" @click="onSubmit">提交</el-button>
					<div style="margin-top: 20px;">
						<el-checkbox v-model="checkedMit">
							我已阅读并同意
						</el-checkbox>
						<a style="color: #F22D24;" @click="openMit">
							《平台供货协议》
						</a>
						<span>、</span>
						<a style="color: #F22D24;">
							《供应链金融服务协议》
						</a>
						<span>。</span>
					</div>
				</el-form-item>
			</el-form>
		</div>
		<easy-agreement-dialog :show="show" @closeBindShow="closeBindShow"></easy-agreement-dialog>
	</div>

</template>

<script>
	import EasyAgreementDialog from '@/components/EasyAgreementDialog/index';
	import ApiAuth from '@/api/auth.js';
	import {mapActions,mapGetters} from "vuex";
	export default {

		data() {
			return {
				checkedMit: true,
				show: false,
				unit: "",
				form: {
					name: "",
					count: "",
					data: "",
					service: "true",
					cash: "",
					supply: "",
					now: "false",
					unit: '',
				},

				rules: {
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					count: [{
						required: true,
						message: '请输入数量',
						trigger: 'blur'
					}, {
						pattern: /^[0-9.]*$/,
						message: '需为数字和小数',
						trigger: 'blur'
					}],
					unit: [{
						required: true,
						message: '请选择单位',
						trigger: 'blur'
					}],
					data: [{
						required: true,
						message: '请选择日期',
						trigger: 'blur'
					}],

					cash: [{
						required: true,
						message: '请输入现金支付商品数量',
						trigger: 'blur'
					}, {
						pattern: /^[0-9.]*$/,
						message: '需为数字和小数',
						trigger: 'blur'
					}],
					supply: [{
						required: true,
						message: '请输入供应链金融支付商品数量',
						trigger: 'blur'
					}, {
						pattern: /^[0-9.]*$/,
						message: '需为数字和小数',
						trigger: 'blur'
					}],
				}
			}
		},
		components: {
			EasyAgreementDialog
		},
		created() {
			this.goodsId = Number(this.$route.query.id);
			this.form.name = this.$route.query.name;
			this.unit = this.$route.query.unit;
			window.scrollTo(0, 0);
			this.ghgoodsWeightTypeList();
		},
		computed:{
			...mapGetters(['shopCartNum']),
		},
		methods: {
			...mapActions({'setShopCartNum':'shopCart/setShopCartNum'}),
			onSubmit() {
				if (!this.checkedMit) {
					this.$message({
						message: '请勾选并阅读协议',
						type: 'warning'
					});
					return;
				}

				this.$refs['Form'].validate((valid) => {
					if (valid) {
						console.log(this.form);
						this.cgpurchase();

						// let shop=JSON.parse(localStorage.getItem('nzjcshopcar'));
						// if(shop==undefined){
						//     shop=[];
						// }
						// shop.push({
						//     cashPayNum: this.form.cash.toString(), //	现金支付商品数量
						//     endTime: this.form.data,//发货时间
						//     financePayNum: this.form.supply.toString(), //金融支付商品数量
						//     goodsNum: this.form.count.toString(), //	农资商品数量
						//     goodsWeightTypeId: this.form.unit, //农资商品计重单位
						//     isNeedFinance: Boolean(this.form.service), //	是否需要金融服务
						//     goodsInfoImage: this.$route.query.goodsImageList,
						//     unit: this.$route.query.unit,
						//     goodsName: this.form.name,
						//     goodsModel: this.$route.query.goodsModel,
						//     shopCartGoodsId: this.goodsId,
						// })
						//
						// localStorage.setItem("nzjcshopcar", JSON.stringify(shop));

						// this.$router.go(0);

						// this.$message({
						//     message: '添加购物车成功',
						//     type: 'success'
						// });


					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			openMit() {
				this.show = true;
			},
			closeBindShow() {
				this.show = false;
			},

			resetForm(formName) {
				//清空表单的验证结果
				this.$refs[formName].resetFields();
			},
			clearValidate(formName) {
				//移除该表单项的校验结果
				this.$refs[formName].clearValidate();
			},

			emptyForm() {
				//重置表单
				this.$nextTick(() => {
					this.clearValidate('Form');
					this.resetForm('Form');
				});
			},

			backToUp() {
				this.$routerUtil.toPath('/goodsDetail/index', {
					fromMsg: 'purchase',
					id: this.goodsId,
					showType: this.$route.query.showType,
					current: this.$route.query.current,
					// goodsName: this.$route.query.goodsName,
					// productAddress: this.$route.query.productAddress,
					// goodsModel: this.$route.query.goodsModel,
					// endTime: this.$route.query.endTime,
					// detailAddress: this.$route.query.detailAddress,
					// goodsNum: this.$route.query.goodsNum,
					// unit: this.$route.query.unit,
					// goodsImageList: this.$route.query.goodsImageList,
					// goodsImageList1: this.$route.query.goodsImageList1,
					// goodsImageList2: this.$route.query.goodsImageList2,
					// goodsImageList3: this.$route.query.goodsImageList3,
					// goodsImageList4: this.$route.query.goodsImageList4,
					// type: this.$route.query.type,
				});
			},

			setcount() {
				var count = parseFloat(this.form.count);
				var cash = parseFloat(this.form.cash);
				var supply = parseFloat(this.form.supply);
				if (count < cash) {
					this.form.cash = count;
					this.form.supply = 0;
				}
				if (count < supply) {
					this.form.supply = count;
					this.form.cash = 0;
				} else {
					this.form.cash = count - supply;
				}
			},

			setcash() {
				var count = parseFloat(this.form.count);
				var cash = parseFloat(this.form.cash);
				if (count < cash) {
					this.form.cash = count;
					this.form.supply = 0;
				} else {
					this.form.supply = count - cash;
				}
			},

			setsupply() {
				var count = parseFloat(this.form.count);
				var supply = parseFloat(this.form.supply);
				if (count < supply) {
					this.form.supply = count;
					this.form.cash = 0;
				} else {
					this.form.cash = count - supply;
				}
			},

			async ghgoodsWeightTypeList() {
				// let time=this.sourceForm.chooseDate
				let res = await this.$store.dispatch('user/ghgoodsWeightTypeList', {});
				console.log(res.data);
				if (res.code == 10200) {
					this.options = res.data;
				}
			},

			async cgpurchase() {
				console.log(this.goodsId);
				let res = await ApiAuth.cgpurchase(this.goodsId, {
					cashPayNum: this.form.cash.toString(), //	现金支付商品数量
					endTime: this.form.data, //发货时间
					financePayNum: this.form.supply.toString(), //金融支付商品数量
					goodsNum: this.form.count.toString(), //	农资商品数量
					goodsWeightTypeId: this.form.unit, //农资商品计重单位
					isNeedFinance: Boolean(this.form.service), //	是否需要金融服务
				});
				// let res = await this.$store.dispatch('user/cgpurchase',{cgInfoId:this.goodsId,data:});

				if (res.code == 10200) {
					this.$message({
						type: "success",
						message: res.msg,
					})
					// let num = this.shopCartNum + 1;
					this.setShopCartNum(++this.shopCartNum)

					this.emptyForm();
				} else {
					this.$message({
						message: res.msg,
						type: "error"
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#release {
		background-color: #f2f3f5;
		padding-bottom: 50px;

		.title {
			padding-top: 20px;
		}

		.release-form {
			background-color: #ffffff;
			margin-top: 20px;
			margin-bottom: 60px;
			padding: 72px 1rem 1rem 10rem;

			.submit {
				width: 500px;
				margin-top: 10px;
				background-color: $ThemeColor;
				color: white;
			}

			::v-deep .el-input-number .el-input__inner {
				text-align: left;
			}

			.el-input-number,
			.el-textarea,
			.el-input,
			.el-button {
				width: 500px;
				font-size: 14px;
			}

			::v-deep .el-form-item {
				padding-top: 5px;
			}

			::v-deep .el-radio__input.is-checked+.el-radio__label {
				color: $ThemeColor !important;
			}

			::v-deep .el-radio__input.is-checked .el-radio__inner {
				background: $ThemeColor !important;
				border-color: $ThemeColor !important;
			}

			::v-deep .el-checkbox {
				.el-checkbox__label {
					color: #333333;
				}

				.el-checkbox__input.is-checked .el-checkbox__inner,
				.el-checkbox__input.is-indeterminate .el-checkbox__inner {
					background-color: $ThemeColor;
					border-color: $ThemeColor;
				}

				.el-checkbox__input.is-focus .el-checkbox__inner,
				.el-checkbox__inner:hover {
					border-color: $ThemeColor;
				}
			}
		}
	}
</style>
