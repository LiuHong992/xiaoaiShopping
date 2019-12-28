import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path: '/',
        component: Home,
        children: [{
            path: '',
            name: 'homepage',
            meta: [{
                title: '首页'
            }],
            component: () =>
                import ('../views/Homepage/Homepage.vue')
        }]
    },
    // 分类
    {
        path: '/classfy',
        component: Home,
        children: [{
            path: '',
            name: 'classfy',
            meta: [{
                title: '分类'
            }],
            component: () =>
                import ('../views/Classfy/Classfy.vue')
        }]
    },
    // 购物车
    {
        path: '/carts',
        component: Home,
        children: [{
            path: '',
            name: 'carts',
            meta: [{
                title: '购物车'
            }],
            component: () =>
                import ('../views/Carts/Carts.vue')
        }]
    },
    // 我的信息
    {
        path: '/my',
        component: Home,
        children: [{
            path: '',
            name: 'my',
            meta: [{
                title: '我的信息'
            }],
            component: () =>
                import ('../views/My/My.vue')
        }]
    },
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: [{
            title: '登录'
        }],
        component: () =>
            import ('../views/Login/Login.vue')
    },
    // 订单结算页面
    {
        path: '/payment',
        name: 'payment',
        meta: [{
            title: '订单结算页面'
        }],
        component: () =>
            import ('../views/Payment/Payment.vue')
    },
    // 我的订单
    {
        path: '/myorder',
        name: 'myorder',
        meta: [{
            title: '我的订单'
        }],
        component: () =>
            import ('../views/Myorder/Myorder.vue')
    },
    // 评价中心
    {
        path: '/evaluationcenter',
        name: 'evaluationcenter',
        meta: [{
            title: '评价中心'
        }],
        component: () =>
            import ('../views/Evaluationcenter/Evaluationcenter.vue')
    },
    // 发布评价
    {
        path: '/postevaluation',
        name: 'postevaluation',
        meta: [{
            title: '发布评价'
        }],
        component: () =>
            import ('../views/Postevaluation/Postevaluation.vue')
    },
    // 评价详情
    {
        path: '/evaluationdetails',
        name: 'evaluationdetails',
        meta: [{
            title: '评价详情'
        }],
        component: () =>
            import ('../views/Evaluationdetails/Evaluationdetails.vue')
    },
    // 商品详情页
    {
        path: '/goodsdetails',
        name: 'goodsdetails',
        meta: [{
            title: '商品详情页'
        }],
        component: () =>
            import ('../views/Goodsdetails/Goodsdetails.vue')
    },
    // 地址列表
    {
        path: '/addresslist',
        name: 'addresslist',
        meta: [{
            title: '地址列表'
        }],
        component: () =>
            import ('../views/Addresslist/Addresslist.vue')
    },
    // 编辑地址
    {
        path: '/editaddress',
        name: 'editaddress',
        meta: [{
            title: '编辑地址'
        }],
        component: () =>
            import ('../views/Editaddress/Editaddress.vue')
    },
    // 收藏页面
    {
        path: '/collection',
        name: 'collection',
        meta: [{
            title: '收藏页面'
        }],
        component: () =>
            import ('../views/Collection/Collection.vue')
    },
    // 浏览历史
    {
        path: '/history',
        name: 'history',
        meta: [{
            title: '浏览历史'
        }],
        component: () =>
            import ('../views/History/History.vue')
    },
    // 错误页面
    {
        path: '*',
        meta: [{
            title: '404 Not Found'
        }],
        component: () =>
            import ('../views/Error/Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router