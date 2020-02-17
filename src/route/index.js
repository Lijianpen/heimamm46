import Vue from 'vue'

import VueRouter from 'vue-router'
import login from "../views/login/login.vue"
import index from "../views/index/index.vue"
import chart from "../views/index/chart/chart.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import questuon from "../views/index/questuon/questuon.vue"
import user from "../views/index/user/user.vue"
import subject from "../views/index/subject/subject.vue"
//用户接口信息
import { info } from "@/api/index.js";
// token 的工具函数 获取token
import { getToken, removeToken } from "../utils/token.js";
// Element-ui弹框
import { Message } from "element-ui"
//导入仓库
import store from '../store/index.js'

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
                title: "登录",
                rules: ['管理员','老师','学生']
            },
        },
        {
            path: "/index",
            component: index,
            meta: {
                title: "首页",
                rules: ['管理员','老师','学生']
            },
            // 嵌套路由
            children: [
                {
                    //不用加/ 
                    //会自动解析为/chart
                    path: "chart",
                    component: chart,
                    meta: {
                        title: "数据概览",
                        rules: ['管理员','老师','学生']
                    },
                },
                {
                    path: "enterprise",
                    component: enterprise,
                    meta: {
                        title: "企业列表",
                        rules: ['管理员']

                    },
                },
                {
                    path: "questuon",
                    component: questuon,
                    meta: {
                        title: "题库列表",
                        rules: ['管理员','老师']
                    },
                },
                {
                    path: "subject",
                    component: subject,
                    meta: {
                        title: "学科列表",
                        rules: ['管理员','老师','学生']
                    },
                },
                {
                    path: "user",
                    component: user,
                    meta: {
                        title: "用户列表",
                        rules: [ '管理员']
                    },
                },

            ]
        }
    ]

})


// 定义 路由白名单 （不需要登录就可以访问的页面）
const whitePaths = ['/login'];

//导航守卫 beforeEach进入之前

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    //开启进度条
    NProgress.start()
    //向后走
    // if (to.path != '/login') {
    // 白名单判断 不存在 转小写

    if (whitePaths.includes(to.path.toLocaleLowerCase()) != true) {
        //需要判断登录
        // token 非空
        if (getToken() == undefined) {
            //为空 就返回登录页
            Message.warning('登录状态有误，请检查');
            //this不是vue示列
            next('/login')
        } else {
            // token不为空 token正确判断
            info().then(res => {
                // window.console.log(res)
                if (res.data.code === 206) {
                    //弹出提示
                    Message.warning('登录有误请重新登录')
                    // 删除token
                    removeToken()
                    //返回登录页
                    next('/login')
                } else if (res.data.code === 200) {
                    if (res.data.data.status === 1) {
                        //用户名
                        const username = res.data.data.username;
                        // 用户头像
                        const userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
                        // 调用仓库的方法
                        store.commit('changeIcon', userIcon)
                        store.commit('changeName', username)
                        if (whitePaths.includes(from.path)) {
                            // 欢迎你
                            Message.success('欢迎你')
                        }
                        const role = res.data.data.role
                        // 获取用户的角色
                        if (to.meta.rules.includes(role)) {
                            // 获取成功放走
                            next()
                        } else {
                            // 没有提示用户
                            Message.warning('没有权限,无法访问')
                            NProgress.done
                        }
                    } else {
                        //禁用状态
                        // 打回登录页
                        Message.waring('当前处于禁用状态,请联系管理员启用')
                        NProgress();
                        next('/login')
                    }
                }
            })
        }
    } else {
        //登录页
        next()
    }
})

//导航守卫 afterEach 进入完成之后
router.afterEach(to => {
    // 关闭进度条
    NProgress.done()
    //修改标题
    window.document.title = to.meta.title
})

export default router