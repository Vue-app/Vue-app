import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import MuseUI from 'muse-ui'
import infiniteScroll from 'vue-infinite-scroll'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import * as filters from './util/filter'

Vue.use(MuseUI)
Vue.use(Vuex)
Vue.use(infiniteScroll)
Vue.config.productionTip = false
// 注册过滤器
/* eslint-disable no-new */
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})
