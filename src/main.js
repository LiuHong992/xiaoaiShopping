import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
import service from "./http"
import Vant from 'vant';
import 'vant/lib/index.css';
import BScroll from '@better-scroll/core'
import './global'
import Api from './http/Api'
import utils from './assets/js/util'


// Vue.use(ElementUI)
const bs = new BScroll('.div')
Vue.use(Vant);
Vue.prototype.$api = Api
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
Vue.prototype.$utils = utils

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')