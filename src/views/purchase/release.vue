<template>
	<div id="release">
		<div class="limit-max-width-inset title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/purchase', query: { showType: $route.query.showType, current: $route.query.current } }">我要采购</el-breadcrumb-item>
				<el-breadcrumb-item>发布需求</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="limit-max-width-inset release-form">
			<el-form ref="Form" :model="form" label-width="155px" label-position="right" :rules="rules">
				<el-form-item label="名称" prop="name"><el-input v-model="form.name" placeholder="请输入商品名称"></el-input></el-form-item>
				<div class="flex">
					<el-form-item label="数量" prop="count">
						<el-input-number
							v-model="form.count"
							:controls="false"
							:precision="2"
							placeholder="请输入商品数量"
							@blur="setcount()"
							:min="0"
							style="width: 400px;"
						></el-input-number>
					</el-form-item>
					<el-form-item prop="unit" style="font-weight: 500;margin-left: -145px;">
						<el-select v-model="form.unit" placeholder="请选择" style="width: 90px;">
							<el-option v-for="item in options" :key="item.goodsWeightTypeId" :label="item.unit" :value="item.goodsWeightTypeId"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<el-form-item label="品类" prop="category">
					<el-cascader style="width: 500px" v-model="form.category" :options="kindsOptions" :props="{ value: 'id' }" @change="handleKindsChange"></el-cascader>
					<!-- <el-select v-model="form.category1" placeholder="请选择一级分类" class="form-category form-category-step">
                        <el-option v-for="(item,index) in category1" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.category2" placeholder="请选择二级分类" class="form-category form-category-step">
                        <el-option v-for="(item,index) in category2" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.category3" placeholder="请选择三级分类" class="form-category">
                        <el-option v-for="(item,index) in category3" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select> -->
				</el-form-item>
				<el-form-item label="主要参数" prop="math"><el-input v-model="form.math" type="textarea" placeholder="请输入参数" resize="none"></el-input></el-form-item>
				<el-form-item label="发货时间" prop="data">
					<el-date-picker v-model="form.data" type="date" placeholder="请选择发货时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
				<el-form-item label="需要金融服务" prop="service">
					<el-radio-group v-model="form.service">
						<el-radio label="true">是</el-radio>
						<el-radio label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="现金支付商品数量" prop="cash">
					<el-input-number
						v-model="form.cash"
						:controls="false"
						:precision="2"
						placeholder="请输入现金支付商品数量"
						@blur="setcash()"
						:disabled="form.service === 'false'"
						:min="0"
					></el-input-number>
				</el-form-item>
				<el-form-item label="供应链金融支付" prop="supply">
					<el-input-number
						v-model="form.supply"
						:controls="false"
						:precision="2"
						placeholder="请输入供应链金融支付商品数量"
						@blur="setsupply()"
						:disabled="form.service === 'false'"
						:min="0.0"
					></el-input-number>
				</el-form-item>
				<el-form-item>
					<el-button class="submit" @click="onSubmit">提交</el-button>
					<div style="margin-top: 20px;">
						<el-checkbox v-model="checkedMit">我已阅读并同意</el-checkbox>
						<a style="color: #F22D24;" @click="openMit">《平台供货协议》</a>
						<span>、</span>
						<a style="color: #F22D24;">《供应链金融服务协议》</a>
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
export default {
	data() {
		return {
			//是否同意协议
			checkedMit: false,
			show: false,
			// fit: '#11151c',
			//表单数据
			form: {
				name: '',
				count: '',
				category: '',
				math: '',
				data: '',
				service: 'true',
				cash: '',
				supply: '',
				now: 'false',
				unit: ''
			},

			options: [],

			//表单规则
			rules: {
				name: [
					{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}
				],
				count: [
					{
						required: true,
						message: '请输入数量',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9.]*$/,
						message: '需为数字和小数',
						trigger: 'blur'
					}
				],
				unit: [
					{
						required: true,
						message: '请选择单位',
						trigger: 'blur'
					}
				],
				math: [
					{
						required: true,
						message: '请输入主要参数',
						trigger: 'blur'
					}
				],
				data: [
					{
						required: true,
						message: '请选择日期',
						trigger: 'blur'
					}
				],
				cash: [
					{
						required: true,
						message: '请输入现金支付商品数量',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9.]*$/,
						message: '需为数字和小数',
						trigger: 'blur'
					}
				],
				supply: [
					{
						required: true,
						message: '请输入供应链金融支付商品数量',
						trigger: 'blur'
					},
					{
						pattern: /^[0-9.]*$/,
						message: '需为数字和小数',
						trigger: 'blur'
					}
				],
				service: [
					{
						required: true,
						message: '请选择是否需要金融服务',
						trigger: 'blur'
					}
				],
				category: [
					{
						required: true,
						message: '请选择品类',
						trigger: 'blur'
					}
				]
			},
			kindsValue: [],
			kindsOptions: []
		};
	},

	components: {
		EasyAgreementDialog
	},
	mounted() {
		this.ghtreeGoodsTypeList();
		this.ghgoodsWeightTypeList();
		window.scrollTo(0, 0);
	},

	methods: {
		onSubmit() {
			if (!this.checkedMit) {
				this.$message({
					message: '请勾选并阅读协议',
					type: 'warning'
				});
				return;
			}
			this.$refs['Form'].validate(valid => {
				if (valid) {
					console.log(this.form);
					this.cgrelease();
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

		handleKindsChange() {
			// todo 品类三级联动选择分类
		},

		async cgrelease() {
			let res = await ApiAuth.cgrelease({
				goodsInfoId: 0, //	农资商品信息ID
				goodsTypeId: Number(this.form.category[this.form.category.length - 1]), //农资商品品类ID
				goodsNum: this.form.count, //	可提供的农资商品数量
				isNowRelease: false, //	是否立即发货
				endTime: this.form.data, //	最迟发货时间
				remark: this.form.math, //备注/主要参数
				isNeedFinance: Boolean(this.form.service), //是否需要金融服务
				cashPayNum: this.form.cash, //现金支付-商品数量
				financePayNum: this.form.supply, //	金融支付-商品数量
				goodsWeightTypeId: this.form.unit, //单位
				goodsName: this.form.name
			});
			// let time=this.sourceForm.chooseDate
			// let res = await this.$store.dispatch('user/cgrelease', );

			console.log(res.data);
			if (res.code == 10200) {
				this.$message({
					type: 'success',
					message: res.msg
				});
				this.emptyForm();
			} else {
				this.$message({
					message: res.msg,
					type: 'error'
				});
			}
		},

		async ghtreeGoodsTypeList() {
			let res = await this.$store.dispatch('user/ghtreeGoodsTypeList', {});
			console.log(res.data);
			if (res.code == 10200) {
				this.kindsOptions = res.data;
			}
		},

		async ghgoodsWeightTypeList() {
			// let time=this.sourceForm.chooseDate
			let res = await this.$store.dispatch('user/ghgoodsWeightTypeList', {});
			console.log(res.data);
			if (res.code == 10200) {
				this.options = res.data;
			}
		}
	}
};
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
		margin-top: 1.875rem;
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

		.form-category {
			width: 160px;
		}

		.form-category-step {
			margin-right: 10px;
		}

		::v-deep .el-form-item {
			padding-top: 5px;
		}

		::v-deep .el-radio__input.is-checked + .el-radio__label {
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
