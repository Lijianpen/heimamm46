import Vue from 'vue'
import App from './App.vue'

import router from "./route/index"
import ele from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'

import store from "./store/index.js"

// 导入全局样式
import './assets/css/base.css'
//导入全局过滤器
import  './filters/index.js'
// 注册
Vue.use(ele)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
