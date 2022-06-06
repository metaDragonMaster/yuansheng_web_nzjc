<template>
    <div id="supply-order" class="limit-max-width">
        <div class="supply-order-flow">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <!--<el-breadcrumb-item :to="{path:'/supply',query:{showType:$route.query.showType,current:$route.query.current}}">我要供货</el-breadcrumb-item>-->
                <el-breadcrumb-item><a @click="backToup">需求详情</a></el-breadcrumb-item>
                <el-breadcrumb-item>供货单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="supply-order-form">
			<div class="good-model-title"><p>订单信息</p></div>
            <div class="order-form-panel">
                <el-form ref="Form" :model="Form" :rules="Rules" label-position="right" label-width="120px">
                    <el-form-item prop="name" label="名称" style="font-weight: 500;">
                        <!--<el-input style="width: 500px" v-model="Form.name" disabled/>-->
                        <span>{{Form.name}}</span>
                    </el-form-item>
                    <el-form-item prop="count" label="数量" style="font-weight: 500;">
                        <el-input style="width: 500px" placeholder="请输入供货数量" v-model="Form.count"/>
                        <span style="margin-left: 10px;">{{this.unit}}</span>
                    </el-form-item>
                    <el-form-item prop="price" label="单价" style="font-weight: 500;">
                        <el-input style="width: 500px" v-model="Form.price"/>
                        <span style="margin-left: 10px;">元</span>
                    </el-form-item>
                    <el-form-item prop="chooseDate" label="发货时间" style="font-weight: 500;">
                        <!--                        <el-input style="width: 500px" v-model="Form.name"/>-->
                        <el-date-picker style="width: 500px" v-model="Form.chooseDate" type="date" placeholder="选择日期"
                                        format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="company" label="物流公司" style="font-weight: 500;">
                        <el-input style="width: 500px" v-model="Form.company"/>
                    </el-form-item>
                    <el-form-item label="物流费用" style="font-weight: 500;" required>
                        <el-col :span="4">
                            <el-form-item prop="moneyValue" style="padding-top: 0;">
                                <el-input v-model="Form.moneyValue" style="width: 100px"/>
                                <span style="margin-left: 10px;">元</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="companyMoney" style="padding-top: 0;">
                                <el-radio-group v-model="Form.companyMoney">
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
                                <el-input style="width: 160px" v-model="Form.account" :disabled='Form.accountType==1'/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="accountType" style="padding-top: 0;">
                                <el-radio-group v-model="Form.accountType" @change="(value)=>{
                                    if(value == 1) {
                                        this.$refs['Form'].clearValidate('account');
                                    }
                                }">
                                    <el-radio :label="1">立即到账</el-radio>
                                    <el-radio :label="2">天</el-radio>
                                    <el-radio :label="3">月</el-radio>
                                    <el-radio :label="4">年</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit" @click="submit"
                                   :disabled="isCansubmit">提交
                        </el-button>
                        <div style="margin-top: 20px;">
                            <el-checkbox v-model="checkedMit" :fill="fit">
                                我已阅读并同意
                            </el-checkbox>
                            <a style="color: #53B753;" @click="intoMit">
                                《平台供货协议》
                            </a>
                        </div>
                        <!-- <el-button type="warning" @click="emptyForm">重置表单</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <easy-agreement-dialog :show="show" @closeBindShow="closeBindShow"></easy-agreement-dialog>
    </div>
</template>

<script>
    // todo 我要供货 -- 需求详情 -- 供货单
    import EasyAgreementDialog from '@/components/EasyAgreementDialog/index';
    import ApiAuth from '@/api/auth.js';
    export default {
        name: "supplyOrder",
        components: {
            EasyAgreementDialog
        },
        data() {
            let moneyReg = (rule, value, callback) => {
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
                            callback()
                        }
                    }, 500);
                }
            };

            return {
                show: false,
                isCansubmit: false,
                checkedMit: false,
                fit: '#11151c',
                // moneyValue: '',
                goodsId: 0,
                unit: "",
                Form: {
                    name: '',
                    chooseDate: '',
                    count: '',
                    price: '',
                    company: '',
                    companyMoney: 1,
                    moneyValue: '',
                    account: '',
                    accountType: 1,
                    // unit: '',
                },

                Rules: {
                    name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }],
                    chooseDate: [{
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
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
                    price: [{
                        required: true,
                        validator: moneyReg,
                        trigger: 'blur'
                    }],
                    company: [{
                        required: true,
                        message: '请输入物流公司',
                        trigger: 'blur'
                    }],
                    companyMoney: [{
                        required: true,
                        message: '请选择物流费用形式',
                        trigger: 'blur'
                    }],
                    accountType: [{
                        required: true,
                        message: '请选择账单形式',
                        trigger: 'blur'
                    }],
                    moneyValue: [{
                        validator: moneyReg,
                        trigger: 'blur'
                    }],
                    account: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.Form.accountType == 1) {
                                    callback();
                                }

                                if (value.length == 0) {
                                    callback(new Error('请填写账期'));
                                }

                                if (!/^\+?[1-9][0-9]*$/.test(value) && value) {
                                    callback(new Error('请输入正整数'));
                                } else {
                                    callback()
                                }
                            }, trigger: 'blur'
                        },
                    ],

                }
            }
        },

        created() {
            this.goodsId = Number(this.$route.query.id);
            this.Form.name = this.$route.query.name;
            this.unit = this.$route.query.unit;
            this.ghgoodsWeightTypeList();
            window.scrollTo(0, 0);
        },
        methods: {
            closeBindShow() {
                this.show = false;
            },
            intoMit() {
                this.show = true;
            },
            backToup() {
                console.log(this.goodsId);

                this.$routerUtil.toPath('/goodsDetail/index', {
                    fromMsg: 'supply',
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

            submit() {

                if (!this.checkedMit) {
                    this.$message({
                        message: '请勾选并阅读协议',
                        type: 'warning'
                    });
                    return;
                }

                this.$refs['Form'].validate(async valid => {
                    if (valid) {
                        console.log(this.Form);
                        this.ghprovide();
                        // !this.haveCurrentRow ? this.add() : this.update();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            async ghgoodsWeightTypeList() {
                // let time=this.sourceForm.chooseDate
                let res = await this.$store.dispatch('user/ghgoodsWeightTypeList', {});
                console.log(res.data);
                if (res.code == 10200) {
                    this.options = res.data;
                }
            },

            async ghprovide() {
                console.log(this.goodsId);
                let res = await ApiAuth.ghprovide(this.goodsId, {
                    chargePeriod: this.Form.account,
                        chargePeriodType: Number(this.Form.accountType),
                        endTime: this.Form.chooseDate,//发货时间
                        goodsNum: this.Form.count.toString(), //	供货数量
                        goodsUnitPrice: this.Form.price, //单价
                        isNowRelease: false,
                        logisticsChargeType: Number(this.Form.companyMoney),//物流费用类型
                        logisticsCompany: this.Form.company,//物流公司
                        logisticsPrice: this.Form.moneyValue,//物流费用
                });
                // let res = await this.$store.dispatch('user/ghprovide', {
                //     cgInfoId: this.goodsId,
                // });

                if (res.code == 10200) {
                    this.$message({
                        type: "success",
                        message: res.msg,
                    })
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

<style lang="scss" scoped>
    #supply-order {
        background-color: #f4f5f9;
        padding-bottom: 30px;

        .supply-order-flow {
            font-size: 14px;
            color: #333333;
            padding-top: 20px;
        }
		.good-model-title {
			height: 75px;
			line-height: 75px;
			border-bottom: 1px solid #F6F6F6;
			p {
				padding-left: 48px;
				position: relative;
		
				&::after {
					content: '';
					display: block;
					width: 40px;
					height: 4px;
					background-color: #008e39;
					margin-top: -4px;
				}
			}
		}
        .supply-order-form {
            height: 680px;
            background-color: #FFFFFF;
            margin-top: 20px;

            .order-form-panel {
                padding-top: 72px;
                padding-left: 130px;
            }

            .submit{
                width: 500px;
                margin-top: 10px;
                background-color: $ThemeColor;
                color: white;
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
