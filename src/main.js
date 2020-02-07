import Vue from 'vue'
import App from './App.vue'

import route from "./route/index"
import ele from "element-ui"


// 注册
Vue.use(ele)
Vue.config.productionTip = false

new Vue({
  route,
  render: h => h(App),
}).$mount('#app')
