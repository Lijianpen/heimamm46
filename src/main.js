import Vue from 'vue'
import App from './App.vue'

import router from "./route/index"
import ele from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'


// 注册
Vue.use(ele)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
