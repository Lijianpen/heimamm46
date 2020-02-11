import Vue from 'vue'

import VueRouter from 'vue-router'
import login from "../views/login/login.vue"
import index from "../views/index/lindex.vue"

// 注册
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login
        },
        {
            path: "/index",
            component: index
        }
    ]
})

export default router