<template>
	<div id="release-source" class="limit-max-width">
		<div class="release-source-flow">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/supply', query: { showType: $route.query.showType, current: $route.query.current } }">我要供货</el-breadcrumb-item>
				<el-breadcrumb-item>发布货源</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="source-flow-form">
			<div class="source-form-panel">
				<el-form ref="Form" :model="sourceForm" :rules="Rules" label-position="right" label-width="120px">
					<el-form-item prop="name" label="名称" style="font-weight: 500;">
						<el-input style="width: 500px" placeholder="请输入商品名称" v-model="sourceForm.name" />
					</el-form-item>
					<el-form-item prop="category" label="品类" style="font-weight: 500;">
						<el-cascader style="width: 500px" v-model="sourceForm.category" :options="kindsOptions" :props="{ value: 'id' }" @change="handleKindsChange"></el-cascader>
					</el-form-item>
					<div class="flex">
						<el-form-item prop="count" label="数量" style="font-weight: 500;">
							<el-input style="width: 400px" placeholder="请输入供货数量" v-model="sourceForm.count" />
							<!-- <span style="margin-left: 10px;">吨</span> -->
						</el-form-item>
						<el-form-item prop="unit" style="font-weight: 500;margin-left: -110px;">
							<el-select v-model="sourceForm.unit" placeholder="请选择" style="width: 90px;">
								<el-option v-for="item in options" :key="item.goodsWeightTypeId" :label="item.unit" :value="item.goodsWeightTypeId"></el-option>
							</el-select>
						</el-form-item>
					</div>
					<el-form-item prop="price" label="单价" style="font-weight: 500;">
						<el-input style="width: 500px" placeholder="请输入供货单价" v-model="sourceForm.price" />
						<span style="margin-left: 10px;">元</span>
					</el-form-item>
					<el-form-item prop="chooseDate" label="发货时间" style="font-weight: 500;">
						<el-date-picker
							style="width: 500px"
							v-model="sourceForm.chooseDate"
							type="date"
							placeholder="选择日期"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</el-form-item>
					<el-form-item prop="mainParams" label="主要参数" style="font-weight: 500;">
						<el-input style="width: 500px" type="textarea" :rows="3" placeholder="请输入主要参数" v-model="sourceForm.mainParams" />
					</el-form-item>
					<el-form-item prop="goodsPic" label="商品图片" style="font-weight: 500;">
						<uploadImg moduleName="nzjc" ref="uploadImage" :limit="5" v-model="sourceForm.goodsPic"></uploadImg>
						<el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
					</el-form-item>
					<el-form-item prop="company" label="物流公司" style="font-weight: 500;">
						<el-input style="width: 500px" placeholder="请输入您选择的物流公司" v-model="sourceForm.company" />
					</el-form-item>
					<el-form-item label="物流费用" style="font-weight: 500;" required>
						<el-col :span="4">
							<el-form-item prop="moneyValue" style="padding-top: 0;">
								<el-input v-model="sourceForm.moneyValue" placeholder="请输入金额" style="width: 100px" />
								<span style="margin-left: 10px;">元</span>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item prop="companyMoney" style="padding-top: 0;">
								<el-radio-group v-model="sourceForm.companyMoney">
									<el-radio :label="1">到付</el-radio>
									<el-radio :label="2">包邮</el-radio>
									<el-radio :label="3">其它</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="账期" style="font-weight: 500;" required>
						<el-col :span="5">
							<el-form-item prop="account" style="font-weight: 500;padding-top: 0;">
								<el-input style="width: 160px" v-model="sourceForm.account" :disabled="sourceForm.accountType == 1" />
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item prop="accountType" style="padding-top: 0;">
								<el-radio-group
									v-model="sourceForm.accountType"
									@change="
										value => {
											if (value == 1) {
												this.$refs['Form'].clearValidate('account');
											}
										}
									"
								>
									<el-radio :label="1">立即到账</el-radio>
									<el-radio :label="2">天</el-radio>
									<el-radio :label="3">月</el-radio>
									<el-radio :label="4">年</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-button class="submit" @click="submit" :disabled="isCansubmit">提交</el-button>
						<div style="margin-top: 20px;">
							<el-checkbox v-model="checkedMit" :fill="fit">我已阅读并同意</el-checkbox>
							<a style="color: #F22D24;" @click="openMit">《平台供货协议》</a>
						</div>
						<!-- <el-button type="warning" @click="emptyForm">重置表单</el-button>-->
					</el-form-item>
				</el-form>
			</div>
		</div>
		<easy-agreement-dialog :show="show" @closeBindShow="closeBindShow"></easy-agreement-dialog>
	</div>
</template>

<script>
import EasyAgreementDialog from '@/components/EasyAgreementDialog/index';
import uploadImg from '@/components/UploadImg/index.vue';
import ApiAuth from '@/api/auth.js';
export default {
	components: {
		EasyAgreementDialog,
		uploadImg
	},
	mounted() {
		window.scrollTo(0, 0);
		this.ghtreeGoodsTypeList();
		this.ghgoodsWeightTypeList();
	},

	data() {
		return {
			// imageUrl:[],

			dialogImageUrl: '',
			dialogVisible: false,

			show: false,
			goodsImgUrl: '',
			isCansubmit: false,
			checkedMit: false,
			fit: '#11151c',
			options: [],
			sourceForm: {
				name: '',
				chooseDate: '',
				count: '',
				price: '',
				mainParams: '',
				company: '',
				companyMoney: 1,
				moneyValue: '',
				account: '',
				accountType: 1,
				category: '',
				goodsPic: [],
				unit: ''
			},

			Rules: {
				name: [
					{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}
				],
				chooseDate: [
					{
						// type: 'date',
						required: true,
						message: '请选择日期',
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
				price: [
					{
						required: true,
						validator: this.moneyReg,
						trigger: 'blur'
					}
				],
				mainParams: [
					{
						required: true,
						message: '请输入主要参数',
						trigger: 'blur'
					}
				],
				company: [
					{
						required: true,
						message: '请输入物流公司',
						trigger: 'blur'
					}
				],
				companyMoney: [
					{
						required: true,
						message: '请选择物流费用形式',
						trigger: 'blur'
					}
				],
				accountType: [
					{
						required: true,
						message: '请选择账单形式',
						trigger: 'blur'
					}
				],
				moneyValue: [
					{
						validator: this.moneyReg,
						trigger: 'blur'
					}
				],
				goodsPic: [
					{
						validator: (rule, value, callback) => {
							let FileList = this.$refs['uploadImage'].getFileList();
							if (FileList.length <= 0) {
								return callback(new Error('请上传图片'));
							} else {
								callback();
							}
						},
						required: true,
						trigger: 'blur'
					}
				],
				category: [
					{
						required: true,
						message: '请选择品种',
						trigger: 'blur'
					}
				],
				account: [
					{
						validator: (rule, value, callback) => {
							if (this.sourceForm.accountType == 1) {
								callback();
							}

							if (value.length == 0) {
								callback(new Error('请填写账期'));
							}

							if (!/^\+?[1-9][0-9]*$/.test(value) && value) {
								callback(new Error('请输入正整数'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}
				]
			},
			// kindsValue: [],
			kindsOptions: [
				{
					id: 'zhinan',
					label: '指南',
					children: [
						{
							id: 'shejiyuanze',
							label: '设计原则',
							children: [
								{
									id: 'yizhi',
									label: '一致'
								},
								{
									id: 'fankui',
									label: '反馈'
								},
								{
									id: 'xiaolv',
									label: '效率'
								},
								{
									id: 'kekong',
									label: '可控'
								}
							]
						},
						{
							id: 'daohang',
							label: '导航',
							children: [
								{
									id: 'cexiangdaohang',
									label: '侧向导航'
								},
								{
									id: 'dingbudaohang',
									label: '顶部导航'
								}
							]
						}
					]
				}
			]
		};
	},
	// mounted() {
	// 	this.ghInfoPayDj(18);
	// },
	methods: {
		moneyReg(rule, value, callback) {
			if (value.length == 0) {
				callback(new Error('请输入金额'));
			}
			if (value.length > 10) {
				callback(new Error('长度在 0 到 10 个字符'));
			} else {
				setTimeout(() => {
					if (!/^\d+[.]?\d{0,2}$/.test(value) && value) {
						callback(new Error('请输入正整数或小数保留两位小数'));
					} else {
						callback();
					}
				}, 500);
			}
		},
		openMit() {
			this.show = true;
		},
		closeBindShow() {
			this.show = false;
		},
		handleKindsChange() {
			// todo 品类三级联动选择分类
		},
		handleGoodsSuccess(res, file) {
			// todo 上传成功的操作
		},
		beforeGoodsUpload(file) {
			// todo 上传文件之前的操作
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleGoodsSuccess(file, fileList) {
			console.log(file);
			console.log(fileList.url);
			this.sourceForm.goodsPic.push(fileList.url);
			console.log(this.sourceForm.goodsPic);
			// this.sourceForm.goodsPic.add(file);
		},

		emptyForm() {
			//重置表单
			this.$nextTick(() => {
				this.clearValidate('Form');
				this.resetForm('Form');
			});
		},
		resetForm(formName) {
			//清空表单的验证结果
			this.$refs[formName].resetFields();
		},
		clearValidate(formName) {
			//移除该表单项的校验结果
			this.$refs[formName].clearValidate();
		},

		async submit() {
			console.log(this.sourceForm.goodsPic);
			if (!this.checkedMit) {
				this.$message({
					message: '请勾选并阅读协议',
					type: 'warning'
				});
				return;
			}
			this.$refs['Form'].validate(async valid => {
				if (valid) {
					console.log('submit!!');
					this.ghrelease();
					// !this.haveCurrentRow ? this.add() : this.update();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

		async ghrelease() {
			let imageList = await this.$refs['uploadImage'].uploadImg();
			this.sourceForm.goodsPic = JSON.stringify(imageList);
			let categoryId = Number(this.sourceForm.category.slice(-1));
			let res = await ApiAuth.ghrelease({
				goodsName: this.sourceForm.name, //	农资商品名称
				goodsWeightTypeId: this.sourceForm.unit,
				goodsTypeId: categoryId, //农资商品品类ID
				goodsNum: this.sourceForm.count, //	可提供的农资商品数量
				goodsUnitPrice: this.sourceForm.price, //农资商品单价
				isNowRelease: true, //	是否立即发货
				endTime: this.sourceForm.chooseDate, //	最迟发货时间
				remark: this.sourceForm.mainParams, //备注/主要参数
				goodsImageList: this.sourceForm.goodsPic, //农资商品标题图片
				// goodsImageList: JSON.stringify(this.sourceForm.goodsPic),
				logisticsCompany: this.sourceForm.company, //物流公司
				logisticsChargeType: this.sourceForm.companyMoney, //物流费用类型（1：到付，2：包邮，3：其它）
				logisticsPrice: this.sourceForm.moneyValue, //	物流费用
				chargePeriod: this.sourceForm.account, //账期
				chargePeriodType: this.sourceForm.accountType //账期类型（1：立即到付，2：天，3：月，4：年）
			});
			// let res = await this.$store.dispatch('user/ghrelease',);

			if (res.code == 10200) {
				this.$message({
					type: 'success',
					message: res.msg
				});
				this.emptyForm();
				this.$refs['uploadImage'].emptyFiles();
				this.$routerUtil.toName("payment",res.data);
			} else {
				this.$message({
					message: '错误',
					type: res.msg
				});
			}
		},

		async ghtreeGoodsTypeList() {
			// let time=this.sourceForm.chooseDate
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

<style lang="scss" scoped>
#release-source {
	background-color: #f4f5f9;
	padding-bottom: 30px;

	.release-source-flow {
		font-size: 14px;
		color: #333333;
		padding-top: 20px;
	}

	.source-flow-form {
		height: auto;
		background-color: #ffffff;
		margin-top: 20px;
		padding-bottom: 40px;

		.source-form-panel {
			padding-top: 72px;
			padding-left: 130px;

			.submit {
				width: 500px;
				margin-top: 10px;
				background-color: $ThemeColor;
				color: white;
			}

			::v-deep.avatar-uploader .el-upload {
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}

			.avatar-uploader .el-upload:hover {
				border-color: #409eff;
			}

			.avatar-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 178px;
				height: 178px;
				line-height: 178px;
				text-align: center;
			}

			.avatar {
				width: 178px;
				height: 178px;
				display: block;
			}
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
