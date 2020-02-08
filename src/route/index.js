import Vue from 'vue'

import VueRouter from 'vue-router'
import login from "../views/login/login.vue"

// 注册
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: login
        }
    ]
})

export default router