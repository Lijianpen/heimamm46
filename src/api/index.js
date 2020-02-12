// 导入 axios
import axios from 'axios';
// 导入 Vue
import Vue from 'vue'
import VueRouter from 'vue-router'
// import chart from "../views/index/chart/chart.vue"

// 导入token工具函数
import {getToken} from "../utils/token.js"

//导入进度条
import NProgress from 'nprogress'
//导入进度条样式
import ''

// 注册
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: []
})
//导航守卫 beforeEach进入之前

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    //开启进度条
    NProgress.start()
    //向后走
    next()
  })
  
  //导航守卫 afterEach 进入完成之后
  router.afterEach(()=>{
    // 关闭进度条
    NProgress.done()
  })





















const indexRequest =axios.create({
    // 基地址
    baseURL:process.env.VUE_APP_URL,
    // 是否跨域  
    withCredentials:true 
})

// 用户信息 接口
export function  info(){
    return indexRequest ({
        url:'/info',
        method:'get',
        // 设置请求头
        //headers 是axios定义的设置方式
        headers:{
            token:getToken()
        }
    })
}
//用户退出 接口
export function  logout(){
    return indexRequest ({
        url:'/logout',
        method:'get',
        // 设置请求头
        //headers 是axios定义的设置方式
        headers:{
            token:getToken()
        }
    })
}