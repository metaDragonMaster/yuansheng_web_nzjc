import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout/index.vue'

Vue.use(VueRouter);
// Router
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    name: 'layout',
    redirect: 'homepage',
    component: layout,
    children: [{
        path: '/homepage',
        name: 'homepage',
        meta: {
            title: "首页",
            isTopMenuNarBar: true,
        },
        component: () => import('@/views/homepage/index.vue'),
    },
        {
            path: '/purchase',
            name: 'purchase',
            meta: {
                title: "采购大厅",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/purchase/index.vue'),
        },
        {

            path: '/purchase/release',
            name: 'purchaseRelease',
            meta: {
                title: "发布需求",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/purchase/release.vue'),
        },
        {
            path: '/purchase/purchaseOrder',
            name: 'purchaseOrder',
            meta: {
                title: "采货单",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/purchase/purchaseOrder.vue'),
        },
        {
            path: '/supply',
            name: 'supply',
            meta: {
                title: "供应大厅",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/supply/index.vue'),
        },
        {
            path: '/supply/releaseSource',
            name: 'releaseSource',
            meta: {
                title: "发布货源",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/supply/releaseSource'),
        },
        {
            path: '/supply/supplyOrder',
            name: 'supplyOrder',
            meta: {
                title: "供货单",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/supply/supplyOrder'),
        },
        {
            path: '/brand/index',
            name: 'brand',
            meta: {
                title: "品牌馆",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/brand/index.vue'),
        },
        {
            path: '/brand/detail',
            name: 'brandDetail',
            meta: {
                title: "品牌馆",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/brand/detail.vue'),
        },
        {
            path: '/goodsDetail/index',
            name: 'goodsDetail',
            meta: {
                title: "商品详情",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/goodsDetail/index.vue'),
        },
        // {
        // 	path: '/dataCenter/index',
        // 	name: 'dataCenter',
        // 	meta: {
        // 		title: "数据中心",
        // 		isTopMenuNarBar: true,
        // 	},
        // 	component: () => import('@/views/dataCenter/index.vue'),
        // },
        {
            path: '/shopCart',
            name: 'shopCart',
            meta: {
                title: "购物车",
                isTopMenuNarBar: true,
            },
            component: () => import('@/views/shopCart/index.vue'),
        },
		{
			path: '/payment',
			name: 'payment',
			meta: {
			    title: "支付",
			    isTopMenuNarBar: true,
			},
			component: () => import('@/views/payment/index.vue'),
		},
    ],

},
    {
        path: '/dataCenter/index',
        name: 'dataCenter',
        component: () => import('@/views/dataCenter/index.vue'),
        meta: {
            title: "数据中心",
        },
    },]

const router = new VueRouter({
    routes,
    // scrollBehavior(to, from, savedPosition) {
    // 	return {
    // 		x: 0,
    // 		y: 0
    // 	}
    // },
})

export default router
