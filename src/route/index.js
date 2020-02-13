import Vue from 'vue'

import VueRouter from 'vue-router'
import login from "../views/login/login.vue"
import index from "../views/index/index.vue"
import chart from "../views/index/chart/chart.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import questuon from "../views/index/questuon/questuon.vue"
import user from "../views/index/user/user.vue"
import subject from "../views/index/subject/subject.vue"

import { info } from "@/api/index";
import { getToken, removeToken } from "@/utils//token";



//导入进度条
import NProgress from 'nprogress'
//导入进度条样式
import 'nprogress/nprogress.css'




// 注册
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: login,
            meta: {
                title: "登录"
            },
        },
        {
            path: "/index",
            component: index,
            meta: {
                title: "首页"
            },
            // 嵌套路由
            children: [
                {
                    //不用加/ 
                    //会自动解析为/chart
                    path: "chart",
                    component: chart, meta: {
                        title: "数据概览"
                    },
                },
                {
                    path: "enterprise",
                    component: enterprise, meta: {
                        title: "切页列表"
                    },
                },
                {
                    path: "questuon",
                    component: questuon, meta: {
                        title: "题库列表"
                    },
                },
                {
                    path: "subject",
                    component: subject, meta: {
                        title: "学科列表"
                    },
                },
                {
                    path: "user",
                    component: user, meta: {
                        title: "用户列表"
                    },
                },

            ]
        }
    ]

})

//导航守卫 beforeEach进入之前

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    //开启进度条
    NProgress.start()
    //向后走
    if (to.path != '/login') {
        //需要判断登录
        // token 非空
        if (getToken() == undefined) {
            //为空 就返回登录页
            //this不是vue示列
            next('/login')
        } else {
            // token不为空 token正确判断
            info().then(res => {
                if (res.data.code === 206) {
                    // 删除token
                    removeToken()
                    //返回登录页
                    next('/login')
                } else if (res.data.code === 200) {
                    // 获取成功放走
                    next()
                }
            })
        }
    }
    next()
})

//导航守卫 afterEach 进入完成之后
router.afterEach(to => {
    // 关闭进度条
    NProgress.done()
    //修改标题
    window.document.title = to.meta.title
    window.console.log(to)
})

export default router