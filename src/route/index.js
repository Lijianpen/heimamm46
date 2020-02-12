import Vue from 'vue'

import VueRouter from 'vue-router'
import login from "../views/login/login.vue"
import index from "../views/index/index.vue"
import chart from "../views/index/chart/chart.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import questuon from "../views/index/questuon/questuon.vue"
import user from "../views/index/user/user.vue"
import subject from "../views/index/subject/subject.vue"

// 注册
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: login
        },
        {
            path: "/index",
            component: index,
            // 嵌套路由
            children: [
                {
                    //不用加/ 
                    //会自动解析为/chart
                    path: "chart",
                    component: chart,
                },
                {
                    path: "enterprise",
                    component: enterprise,
                },
                {
                    path: "questuon",
                    component: questuon,
                },
                {
                    path: "subject",
                    component: subject,
                },
                {
                    path: "user",
                    component: user,
                },

            ]
        }
    ]
})

export default router