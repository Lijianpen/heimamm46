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
//导入学科列表
import enterpriseSel from './views/index/questuon/components/enterpriseSel.vue';
//导入企业列表
import subjectSel from './views/index/questuon/components/subjectSel.vue';


//注册学科
Vue.component('enterpriseSel',enterpriseSel)
//注册企业
Vue.component('subjectSel',subjectSel)



// 注册
Vue.use(ele)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
