<template>
    <div id="shop-cart" limit-max-width>
        <ol class="select-goods-type-ol flex">
            <li>全部商品</li>
            <!-- <div class="label-alive"></div> -->
        </ol>

        <el-table
                ref="TableDom"
                :data="tableData"
                show-overflow-tooltip
                tooltip-effect="dark"
                @select-all="selectAll"
                @selection-change="handleSelectionChange"
                :header-cell-style="{ textAlign: 'center', 'background-color': '#f9f9f9', color: '#333333' }"
                :cell-style="{ textAlign: 'center' }"
                :key="itemKey"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品信息" prop="goodInfo" min-width="300">
                <template v-slot="{ row }">
                    <div class="good-info-card">
                        <img :src="row.goodsInfoImage" alt=""/>
                        <p class="font-hide-2">{{ row.goodsName }}</p>
                        <span>{{ row.goodsModel }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="商品数量" prop="goodsNum">
                <template v-slot="{ row }">
                    <span>{{ row.goodsNum + row.unit }}</span>
                </template>
            </el-table-column>
            <el-table-column label="供应链金融支付" prop="financePayNum">
                <template v-slot="{ row }">
                    <span>{{ row.financePayNum + row.unit }}</span>
                </template>
            </el-table-column>
            <el-table-column label="现金支付" prop="cashPayNum">
                <template v-slot="{ row }">
                    <span>{{ row.cashPayNum + row.unit }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="{ row }">
                    <el-link type="danger" @click="shopCartdelete(row.shopCartGoodsId)">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <div class="shop-cell flex-js-sb">
            <div class="select-all flex">
                <!--<el-checkbox v-model="checked" ref='checkAllDom'  @change='checkSelectAll'></el-checkbox>-->
                <p>收货地址：</p>
                <p>{{ address }}</p>
                <!--<button @click="()=>{showAddress=!showAddress;}"></button>-->
                <img src="../../assets/iconImages/arrow_down.png" @click="arrowBtn"/>
            </div>
            <div class="flex-align-center flex">
                <p>
                    已选购商品
                    <span>{{ multipleSelection.length }}</span>
                    件
                </p>
                <button @click="shopCartCommit">购买</button>
            </div>

            <div class="address flex" v-show="showAddress">
                <button
                        @click="
						() => {
							this.Add = true;
							this.showAddress = false;
						}
					"
                >
                    新增地址
                </button>
                <el-table :data="addressData" :show-header="false" height="259" style="width: 100%"
                          class="address-table" @row-click="selectAddress">
                    <el-table-column prop="phoneNo" label="号码" width="140"></el-table-column>
                    <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
                    <el-table-column prop="detailAddress" label="地址"></el-table-column>
                </el-table>
            </div>
            <div class="address-add flex" v-show="Add">
                <!--<button>新增地址</button>-->
                <el-form ref="Form" :model="addressForm" label-position="right" label-width="100px">
                    <el-form-item prop="userName" label="姓名" class="address-add-item">
                        <el-input v-model="addressForm.userName" clearable/>
                    </el-form-item>
                    <el-form-item prop="phoneNo" label="手机号" class="address-add-item">
                        <el-input v-model="addressForm.phoneNo" onkeyup="value=value.replace(/[^\d]/g,'')" clearable/>
                    </el-form-item>
                    <el-form-item prop="address" label="地区" class="address-add-item">
                        <!-- <el-input v-model="Form.address" clearable /> -->
                        <SelectAddress ref="SelectAddress" @emitCityNo="getAddressNo" @emitAddress="labels => (addressForm.address = labels)"></SelectAddress>
                    </el-form-item>
                    <el-form-item prop="detailAddress" label="详细地址">
                        <el-input type="textarea" :rows="4" placeholder="请输入详细地址" v-model="addressForm.detailAddress"
                                  resize="none"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submitData" class="btnsure">确定</el-button>
                        <el-button @click="Add = false" class="btnreturn">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import SelectAddress from '@/components/SelectAddress/index.vue';
    import RegExpUtil from '@/utils/RegExpUtil';
    import ApiAuth from '@/api/auth.js';

    export default {
        data() {
            return {
                tableData: [
                    {
                        // goodInfo:"这是商品名称这是商品名称这是商品名称这是商品名称这是商品名称",
                        goodsInfoImage: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        goodsName: '鑫颖达 2021新式四驱微耕机多功能农用汽油柴油开沟起垄除草播种家用旋耕',
                        goodsModel: '170汽油机手拉款7.5马力全套配件',
                        cashPayNum: '2',
                        goodsNum: '2',
                        financePayNum: '0',
                        shopCartGoodsId: 1,
                        unit: '吨'
                    }
                ],

                addressForm: {
                    userName: '',
                    phoneNo: '',
                    address: [],
                    detailAddress: '',
                    defaultAddress: true,
                    areaCode: '',
                    cityCode: '',
                    provinceCode: ''
                },

                addressData: [
                    {
                        userName: '张三1',
                        phoneNo: 15188888888,
                        detailAddress: '湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    },
                    {
                        userName: '张三2',
                        phoneNo: 15188888888,
                        detailAddress: '湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    },
                    // {
                    //     userName: '张三3',
                    // 	phone: 15188888888,
                    // 	address: '湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    // },
                    // {
                    //     userName: '张三4',
                    // 	phone: 15188888888,
                    // 	address: '湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    // },
                    // {
                    //     userName: '张三5',
                    // 	phone: 15188888888,
                    // 	address: '湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    // },
                    // {
                    //     userName: '张三6',
                    // 	phone: 15188888888,
                    // 	address: '湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    // },
                    // {
                    //     userName: '张三7',
                    // 	phone: 15188888888,
                    // 	address: '湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    // },
                    // {
                    // 	name: '张三8',
                    // 	phone: 15188888888,
                    // 	address: '1湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心'
                    // }
                ],
                checked: false,
                showAddress: false,
                Add: false,
                address: '张三 15188888888 湖南省常德市武陵区德山镇经济技术开发区桃林路627号中通快递运转中心',
                multipleSelection: [],
                itemKey: '0'
                // Rules: {
                //     // userName: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                //     phoneNo: [{required: true, message: '请输入手机号', trigger: 'blur'}],
                //     address: [{required: true, message: '请选择地址', trigger: 'blur'}],
                //     addressInfo: [{required: true, message: '请输入详细地址', trigger: 'blur'}],
                // }
            };
        },
        components: {
            SelectAddress
        },
        computed: {},
        mounted() {
            this.shopCartList();
            this.getAddress();

            // goodsInfoImage: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            //     goodsName: "鑫颖达 2021新式四驱微耕机多功能农用汽油柴油开沟起垄除草播种家用旋耕",
            //     goodsModel: "170汽油机手拉款7.5马力全套配件",
            //     cashPayNum: "2",
            //     goodsNum: "2",
            //     financePayNum: "0",
            //     shopCartGoodsId: 1,
            //     unit: "吨"
            // console.log(this.$shopcar)
            // this.tableData=this.$shopcar;
            // this.tableData = JSON.parse(localStorage.getItem('nzjcshopcar'));
            // this.tableData.goodsInfoImage=this.$shopcar.
        },
        onclick: {},
        methods: {
            selectAll(selection) {
                this.isIndeterminate = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let isSelectAll = val.length == this.tableData.length;
                let isIndeterminate = val.length > 0 && val.length < this.tableData.length;
            },

            selectAddress(row, column, cell, event) {
                if(row){
                    this.address = row.userName + ' ' + row.phoneNo + ' ' + row.detailAddress;
                }else{
                    this.address="";
                }

                this.showAddress = false;
                console.log(this.address);
            },

            arrowBtn() {
                this.showAddress = !this.showAddress;
                this.Add = false;
            },

            getAddressNo(Nos) {
                console.log(Nos);
                this.addressForm['provinceCode'] = Nos[0];
                this.addressForm['cityCode'] = Nos[1];
                this.addressForm['areaCode'] = Nos[2];
            },

            async shopCartList() {
                let res = await ApiAuth.shopCartList();
                // let res = await this.$store.dispatch('user/shopCartList');
                console.log(res.data);
                if (res.code == 10200) {
                    this.tableData = res.data;
                    console.log(typeof this.tableData);
                    for (let i = 0; i < this.tableData.count; i++) {
                        this.tableData[i].goodAmount = '￥' + this.tableData[i].goodsNum * this.tableData[i].totalPrice;
                        this.tableData[i].goodsNum += this.tableData[i].unit;
                    }
                }
            },

            async shopCartdelete(id) {
                // for (let i = 0; i < this.tableData.length; i++) {
                //     console.log(this.tableData[i])
                //     if (this.tableData[i] != undefined) {
                //         if (this.tableData[i].shopCartGoodsId == id) {
                //             delete this.tableData[i];
                //
                //             // this.tableData.slice(i,1);
                //             this.itemKey = Math.random();
                //             break;
                //         }
                //     }
                //
                // }
                //
                // let shop=[];
                // for (let i = 0; i <this.tableData.length ; i++) {
                //     if (this.tableData[i] != undefined) {
                //         shop.push(this.tableData[i]);
                //     }
                // }
                //
                // localStorage.setItem("nzjcshopcar", JSON.stringify(shop));
                // this.$router.go(0);

                let res = await ApiAuth.shopCartdelete(id);
                // let res = await this.$store.dispatch('user/shopCartdelete', id);
                console.log(res.data);
                if (res.code == 10200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });

                    this.shopCartList();
                }
            },

            async shopCartCommit() {
                let array = [];
                if (this.multipleSelection.length <= 0) {
                    this.$message({
                        type: 'warning',
                        message: '请至少选择一件商品'
                    });
                    return;
                } else {
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        array.push(this.multipleSelection[i].shopCartGoodsId);
                    }
                }
                console.log(array);
                array = array.join(',');
                let res = await ApiAuth.shopCartCommit({shopCartGoodsIds: array});
                console.log(res.data);
                if (res.code == 10200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });

                    this.shopCartList();
                }
            },

            async getAddress() {
                let res = await ApiAuth.showAddressList();
                console.log(res.data)
                if (res.code == 10200) {
                    // this.tableData = data.records;
                    this.addressData = res.data;
                    if (res.data) {
                        this.selectAddress(res.data[0])
                    } else {
                        this.address = "";
                    }

                    // this.tableQueryOption.total = data.total;
                }
            },

            async submitData() {
                if (this.addressForm.userName.length <= 0) {
                    this.warnMsg('请填写姓名');
                    return;
                }

                if (
                    (this.$refs['SelectAddress'].addressNo.areaRegionNo &&
                        this.$refs['SelectAddress'].addressNo.cityRegionNo &&
                        this.$refs['SelectAddress'].addressNo.provinceRegionNo) == null
                ) {
                    this.warnMsg('请选择合适的地址信息');
                    return;
                }
                // this.addressForm.address = this.$refs['SelectAddress'].pvalue + this.$refs['SelectAddress'].cvalue + this.$refs['SelectAddress'].avalue;
                if (!RegExpUtil.phone(this.addressForm.phoneNo)) {
                    this.warnMsg('请填写正确的电话号码格式');
                    return;
                }

                let params = {
                    ...this.addressForm
                };
                let res = await ApiAuth.addAddress(params);
                if (res.code == 10200) {
                    let message = '添加地址成功';
                    this.$notify({
                        title: '成功',
                        message: message,
                        type: 'success',
                        duration: 2000
                    });
                    this.$emit('success');
                    this.show = false;
                    this.getAddress();
                    // this.$refs["Form"].clearValidate();
                    this.$refs["Form"].resetFields();
                    this.$refs['SelectAddress'].emptyData();

                } else {
                    this.$notify({
                        title: '错误',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                    });
                }
                // console.log(this.addressForm.address)
                // console.log(this.$refs['SelectAddress'].addressNo.areaRegionNo)
                this.Add = false;
            },

            warnMsg(msg) {
                this.$message({
                    title: '信息问题',
                    message: msg,
                    type: 'warning'
                });
            }
        }
    };
</script>
<style lang="scss" scoped="scoped">
    #shop-cart {
        $color: #ff3a33;
        background-color: #f2f3f5;
        padding-top: 10px;
        .shop-cell {
            background-color: #f9f9f9;
            height: 55px;
            margin-bottom: 30px;
            position: relative;

            .select-all {
                /*padding: 0.625rem 1.25rem;*/
                margin: auto 10px;
                p {
                    color: #333333;
                    margin-right: 0;
                    font-size: 14px;
                }

                img {
                    margin: auto 10px;
                    width: 10px;
                    height: 12px;
                    //background-color: $color;
                }
            }
            .flex-align-center {
                p {
                    font-size: 0.875rem;
                    margin: auto 50px;
                }

                button {
                    background-color: $color;
                    color: #ffffff;
                    width: 150px;
                    height: 100%;
                }
            }
            p {
                font-size: 0.875rem;
                margin-right: 2.5rem;
                span {
                    color: $color;
                }
            }

            .address {
                width: 738px;
                height: 320px;
                background: #ffffff;
                box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.1);
                position: absolute;
                bottom: 55px;
                z-index: 1;
                flex-direction: column;

                .address-table {
                    cursor: pointer;
                }

                button {
                    width: 90px;
                    height: 36px;
                    background: $color;
                    border-radius: 2px;
                    font-size: 14px;
                    line-height: 19px;
                    color: #ffffff;
                    margin: 12px 20px 13px auto;
                }
            }

            .address-add {
                position: absolute;
                bottom: 55px;
                left: 180px;
                z-index: 1;
                width: 520px;
                height: 351px;
                background: #ffffff;
                box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.1);

                padding-top: 30px;
                padding-right: 32px;
                padding-bottom: 40px;

                .address-add-item {
                    height: 30px;
                    margin-bottom: 16px;
                }

                .btnsure {
                    background-color: $color;
                    color: white;
                    width: 120px;
                }
            }
        }
        .select-goods-type-ol {
            margin-bottom: 1rem;
            margin-top: 1rem;
            border-bottom: 0.125rem solid #f2f2f2;
            li {
                padding: 0.75rem 0.25rem;
                border-bottom: 0.125rem solid $ThemeColor;
                margin-bottom: -0.125rem;
                font-weight: bold;
            }
        }
        .good-info-card {
            display: grid;
            grid-gap: 10px;
            grid-template-areas: 'a b b' 'a b b' 'a b b' 'a c c';
            text-align: left;
            img {
                grid-area: a;
                width: 80px;
                height: 80px;
            }
            p {
                grid-area: b;
                font-weight: bold;
                width: 320px;
            }
            span {
                grid-area: c;
                color: #999999;
            }
        }
    }
</style>
