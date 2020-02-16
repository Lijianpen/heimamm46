// 导入 axios
import axios from 'axios';
// // 导入 Vue
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import chart from "../views/index/chart/chart.vue"

// 导入token工具函数
import {getToken} from "../utils/token.js"


// // 注册
// Vue.use(VueRouter)

// Vue.config.productionTip = false;

// 用户信息 接口
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