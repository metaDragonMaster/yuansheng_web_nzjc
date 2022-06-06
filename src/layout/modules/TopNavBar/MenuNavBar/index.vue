<template>
    <div id="menu-nav-bar" limit-max-width v-show="$route.meta.isTopMenuNarBar">
        <ul>
            <!-- <li v-for="(item,index) in menuList" :key="item.toName" -->
            <li v-for="(item,index) in menuList" :key="item.label"
                :class="[{'alive':currentIndex == index}]"
                @click="toRoute(item)">
                {{item.label}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentIndex: 0,
                menuList: [
                    {
                        label: "首页",
                        toName: "homepage"
                    },
                    {
                        label: "我要采购",
                        toName: "purchase"
                    },
					{
					    label: "我要供货",
					    toName: "supply"
					},
                    {
                        label: "数据中心",
                        toName: "dataCenter"
                    },
                    {
                        label: "品牌馆",
                        toName: "brand"
                    },
                    {
                        label: "农资企业入驻",
                        newWindow: "settled/agriculturalEnterprise"
                    },
                    {
                        label: "合伙企业入驻",
                        newWindow: "settled/cooperative"
                    },
                    // {
                    // 	label:"交易大厅",
                    // 	toName:"transactionPlace"
                    // },
                    // {
                    // 	label:"采购大厅",
                    // 	toName:"purchase"
                    // },
                    // {
                    // 	label:"供应大厅",
                    // 	toName:"supply"
                    // },
                ],
            }
        },
        watch: {
            $route(route) {
                this.startRouteCurrentIndex();
            }
        },
        components: {},
        computed: {},
        created() {
            this.startRouteCurrentIndex();
        },
        methods: {
            toRoute(item) {
                if (item.toName) {
                    this.$routerUtil.toName(item.toName);
                }
                if (item.newWindow) {
                    let url = process.env.VUE_APP_BASE_WEBURL;
                    this.$routerUtil.newWindow(url + item.newWindow,'_media');
                }
                // this.startRouteCurrentIndex();
            },
            startRouteCurrentIndex() {
                // let num = 0;
                if (this.$route.name == "shopCart") {
                    this.currentIndex = -1;
                    return;
                }

                if (this.$route.name == "goodsDetail") {
                    this.currentIndex = -1;
                    return;
                }

                for (let index = 0; index < this.menuList.length; index++) {
                    if (this.$route.name == this.menuList[index].toName) {
                        this.currentIndex = index;
                        // num++;
                        break;
                    }
                }
                // num <= 0 ? this.currentIndex = -1 : null;
            }
        }
    }
</script>
<style lang="scss" scoped="scoped">
    #menu-nav-bar {
        // background-color: #00BF30;
        ul {
            display: flex;
            height: 3.125rem;
            line-height: 3.125rem;
            li {
                // min-width: 7.75rem;
                text-align: center;
                cursor: pointer;
                font-size: 1.125rem;
                padding: 0 1.875rem;
            }
        }
        .alive {
            color: $ThemeColor;
        }
    }
</style>
