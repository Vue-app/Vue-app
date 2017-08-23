import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import * as filters from './util/filter'
// as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回
Vue.use(MuseUI)
Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})
