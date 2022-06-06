<template>
    <div class="goods-detail-bottom">
        <div class="bottom-title">
            需求详情
            <div class="line"></div>
        </div>
        <div class="bottom-content flex">
            <div class="content-item flex" v-for="(item,index) in info.goodsDetail">
                <div>{{item.key}}</div>
                <div class="content-item-text">{{item.value}}</div>
            </div>
            <!-- 			<div class="content-item flex">
                <div>{{info[0].goodsName}}</div>
                <div class="content-item-text">{{info[0].goodsName}}</div>
            </div> -->
        </div>
        <div class="bottom-imglist">
            <el-image class="bottom-imglist-item" :src="item" fit='cover' v-for="(item,index) in info.goodsImageList"
                      :key="index"></el-image>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goodsDetailBottom",
        data() {
            return {}
        },
        props: {
            info: {
                type: Object,
                default: () => {
                },
            },
        },
    }
</script>

<style lang="scss" scoped>
    .goods-detail-bottom {
        margin-top: 15px;
        background-color: #FFFFFF;
        height: auto;
        padding: 40px;

        .bottom-title {
            color: #333333;
            font-size: 20px;
            font-weight: 400;

            .line {
                margin-top: 10px;
                height: 1px;
                width: 80px;
                background-color: #069B87;
            }
        }

        .bottom-content {
            margin-top: 4px;
            flex-wrap: wrap;
            padding: 0 30px 0 30px;
            align-content: stretch;
            justify-content: space-between;

            .content-item {
                min-width: 33%;
                min-height: 40px;
                margin-top: 20px;
                color: #666666;

                .content-item-text {
                    margin-left: 30px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 280px;
                    overflow: hidden;
                }
            }
        }

        .bottom-imglist {
            margin-top: 30px;
            margin-bottom: 30px;

            .bottom-imglist-item {
                margin-top: 20px;
                margin-right: 200px;
                border-radius: 4px;
                margin-left: 160px;
                width: 800px;
                height: 800px;
            }

        }
    }
</style>
