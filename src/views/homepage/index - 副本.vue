<template>
    <div id="homepage">
        <div class="no-1  banner">
            <div class="banner-title limit-max-width flex-column-center">
                <!--<h1>互联网赋能农资集采供应</h1>-->
                <!--<div>数字化、规模化采购模式，助力供需双方降本增效</div>-->
            </div>
            <div class="banner-model limit-max-width">
                <p>成交数据</p>
                <ul class="ul-count-to">
                    <li>
                        <span>成交规模</span>
                        <p>
                            <countTo :startVal="0" :endVal="10000" suffix="+" :duration="3000"></countTo>
                            <span>亿元</span>
                        </p>
                    </li>
                    <li>
                        <span>入驻合伙企业</span>
                        <p>
                            <countTo :startVal="0" :endVal="1600" suffix="+" :duration="3000"></countTo>
                            <span>万家</span>
                        </p>
                    </li>
                    <li>
                        <span>平台供应商</span>
                        <p>
                            <countTo :startVal="0" :endVal="4592" suffix="+" :duration="3000"></countTo>
                            <span>万家</span>
                        </p>
                    </li>
                    <li>
                        <span>采购商数</span>
                        <p>
                            <countTo :startVal="0" :endVal="2483" suffix="+" :duration="3000"></countTo>
                            <span>万家</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="no-2 limit-max-width">
            <div class="modelus-title">
                <p class="modelus-title1">
                    合作品牌
                    <span></span>
                    <span></span>
                    <span></span>
                </p>
            </div>
            <div class="swiper-box">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in 2" :key="index">
                            <img src="@/assets/images/homepage/1.jpg" alt=""/>
                            <img src="@/assets/images/homepage/2.jpg" alt=""/>
                            <img src="@/assets/images/homepage/3.jpg" alt=""/>
                            <img src="@/assets/images/homepage/4.jpg" alt=""/>
                            <img src="@/assets/images/homepage/5.jpg" alt=""/>
                            <img src="@/assets/images/homepage/6.jpg" alt=""/>
                            <img src="@/assets/images/homepage/1.jpg" alt=""/>
                            <img src="@/assets/images/homepage/2.jpg" alt=""/>
                            <img src="@/assets/images/homepage/3.jpg" alt=""/>
                            <img src="@/assets/images/homepage/4.jpg" alt=""/>
                        </div>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
                    <div class="swiper-button-next"></div>
                    <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
                    <!-- <div class="swiper-pagination"></div> -->
                </div>
            </div>
        </div>
        <div class="no-3 limit-max-width">
            <div class="modelus-title">
                <p class="modelus-title2">
                    所有农产品大类
                    <span></span>
                    <span></span>
                    <span></span>
                </p>
            </div>
            <ul class="flex-js-sard">
                <li class="flex-column-center-js-sb">
                    <img src="@/assets/images/homepage/no3-1.png" alt="">
                    <p>认证原生农资</p>
                </li>
                <li class="flex-column-center-js-sb">
                    <img src="@/assets/images/homepage/no3-2.png" alt="">
                    <p>商品防伪溯源</p>
                </li>
                <li class="flex-column-center-js-sb">
                    <img src="@/assets/images/homepage/no3-3.png" alt="">
                    <p>互联网赋能</p>
                </li>
            </ul>
        </div>
        <div class="no-4 limit-max-width">
            <div class="modelus-title">
                <p class="modelus-title3">
                    农资企业入驻
                    <span></span>
                    <span></span>
                    <span></span>
                </p>
                <p>直面消费者</p>
            </div>
            <img src="@/assets/images/homepage/no4.png" alt=""/>
            <p class="flex-js-sb">
                <span>注册账户</span>
                <span>认证为供应商</span>
                <span>为合作社集中供货</span>
            </p>
            <button @click="seek">立即咨询</button>
        </div>
    </div>
</template>
<script>
import countTo from 'vue-count-to';
import Swiper from 'swiper/swiper-bundle.min.js';
import 'swiper/swiper-bundle.min.css';

export default {
    data() {
        return {
            no2List: [],
            _swiper: undefined,
            swiperOption: {
                el: '.swiper-container',
                loop: true, //循环
                // autoplay : true,
                autoplay: {
                    delay: 3000 //自动切换的时间间隔，单位ms
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
                // pagination: {
                // 	//分页符
                // 	el: '.swiper-pagination',
                // 	clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                // }
            }
        };
    },
    components: {
        countTo
    },
    mounted() {
        this.$nextTick(() => {
            this.swiperInit();
        });
    },
    methods: {
        swiperInit() {
            this._swiper = new Swiper('.swiper-container', this.swiperOption);
        },

        seek(){
            let url = process.env.VUE_APP_BASE_WEBURL;
            this.$routerUtil.newWindow(url + "settled/cooperative",'_media');
        }
    }
};
</script>
<style lang="scss" scoped="scoped">
#homepage {
    .modelus-title {
        text-align: center;
        padding: 3.75rem 0;

        .modelus-title1 {
            color: #F22D24;

            span {
                &::after,
                &::before {
                    background-color: #F22D24;
                }
            }
        }

        .modelus-title2 {
            color: #FF8000;

            span {
                &::after,
                &::before {
                    background-color: #FF8000;
                }
            }
        }

        .modelus-title3 {
            color: #F2A600;

            span {
                &::after,
                &::before {
                    background-color: #F2A600;
                }
            }
        }

        p:first-child {

            font-size: 2.25rem;
            font-weight: bold;
            display: inline-block;
            position: relative;

            span {
                &::after,
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    border-radius: 50%;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            span:nth-child(1) {
                &::after,
                &::before {
                    width: 0.375rem;
                    height: 0.375rem;
                }

                &::after {
                    left: -1rem;
                }

                &::before {
                    right: -1rem;
                }
            }

            span:nth-child(2) {
                &::after,
                &::before {
                    width: 0.5rem;
                    height: 0.5rem;
                }

                &::after {
                    left: -2.5rem;
                }

                &::before {
                    right: -2.5rem;
                }
            }

            span:nth-child(3) {
                &::after,
                &::before {
                    width: 0.7rem;
                    height: 0.7rem;
                }

                &::after {
                    left: -4.25rem;
                }

                &::before {
                    right: -4.25rem;
                }
            }
        }

        p:last-child {
            margin-top: 1rem;
        }
    }

    .no-1 {
        height: 600px;
        background-image: url(../../assets/images/homepage/banner.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: #FFFFFF;
        position: relative;

        .banner-title {
            height: calc(100% - 150px);

            h1 {
                font-size: 3.625rem;
                margin-bottom: 1rem;
            }

            div {
                display: block;
                font-size: 1.40rem;
                position: relative;
                top: 20px;

                &::after,
                &::before {
                    content: "";
                    display: block;
                    height: 0.0825rem;
                    width: 3.125rem;
                    background-color: #FFFFFF;
                    position: absolute;
                    top: 50%;
                }

                &::after {
                    right: - 66px;
                }

                &::before {
                    left: - 66px;
                }
            }
        }

        .banner-model {
            height: 9.375rem;
            width: 100%;
            position: absolute;
            bottom: 0;
            display: grid;
            grid-template-columns: 15.625rem auto;
            background-color: #FF8000;

            & > p {
                font-size: 2.25rem;
                line-height: 9.375rem;
                padding: 0 3.125rem;
            }

            .ul-count-to {
                // height: 100%;
                // margin-top: 2.625rem;
                color: #ffffff;
                display: flex;
                justify-content: space-between;
                align-items: center;

                li {
                    flex: 1;

                    & > span {
                        margin-left: 2.5rem;
                        font-size: 0.75rem;
                    }

                    p {
                        text-align: center;

                        span:first-child {
                            font-size: 2.5rem;
                            white-space: nowrap;
                        }

                        span:last-child {
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
    }

    .no-2 {
        background-image: url("../../assets/images/homepage/no2-bg.png");

        .swiper-box {
            // width: 85.5%;
            // margin: auto;
            .swiper-slide {
                padding: 0 7.75%;
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-gap: 0.875rem;
            }

            .swiper-button-next,
            .swiper-button-prev {
                background-color: #999999;
                color: #F2F2F2;
                padding: 1rem 0.25rem;
                box-sizing: initial;
                transform: translateY(-50%);

                &:hover {
                    background-color: #d9d9d9;
                }
            }
        }
    }

    .no-3 {
        img {
            width: 5.625rem;
            margin-bottom: 1rem;
        }
    }

    .no-4 {

        background-image: url("../../assets/images/homepage/no4-bg.png");

        img {
            display: block;
            width: 53.25rem;
            margin: 0 auto;
        }

        .flex-js-sb {
            margin: 1rem auto 3.125rem auto;
            width: 70rem;

            span {
                flex: 1;
                text-align: center;
            }
        }

        button {
            width: 12.5rem;
            height: 4rem;
            margin: 0 auto;
            display: block;
            background: #08CCB2;
            color: #FFFFFF;
            font-size: 1.5rem;
            border-radius: 0.25rem;
        }
    }

    .no-2,
    .no-3,
    .no-4 {
        padding-bottom: 6.625rem;
    }
}
</style>
