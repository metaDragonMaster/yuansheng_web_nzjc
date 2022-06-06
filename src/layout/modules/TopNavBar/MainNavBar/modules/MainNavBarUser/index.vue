<template>
	<div id="main-nav-bar-user" flex>
		<button @click="$routerUtil.toName('homepage')">欢迎来到原生联</button>
		<div class="flex-js-sard" v-if="!userInfo">
			<button class="user-to-login-button" @click="login()"><span>你好，请登录</span></button>
			<button class="user-to-register-button" @click="register"><span>免费注册</span></button>
		</div>
		<div v-else class="user-info-mobile">
			<p>
				{{userInfo.mobile}}
			</p>
		</div>
	</div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {};
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            login(){
                let url = process.env.VUE_APP_BASE_WEBURL;
                this.$routerUtil.newWindow(url + "userSign/login",'_media');
            },

            register(){
                let url = process.env.VUE_APP_BASE_WEBURL;
                this.$routerUtil.newWindow(url + "userSign/register",'_media');
            },
		}
    };
</script>
<style lang="scss" scoped="scoped">
	#main-nav-bar-user {
		button {
			color: #999999;
		}
		.user-to-login-button {
			margin-left: 1rem;
			span {
				padding-right: 1rem;
				padding-left: 1rem;
				position: relative;
				&:after {
					content: '|';
					display: block;
					position: absolute;
					right: -0.125rem;
					top: -0.0625rem;
					color: #828282;
				}
			}
		}
		.user-to-register-button {
			color: #099b88;
			font-weight: bold;
			padding-left: 1rem;
		}
		.user-info-mobile {
			display: flex;
			align-items: center;
			margin-left: 2rem;
		}
	}
</style>
