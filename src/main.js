import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import * as filters from './util/filter'
Vue.use(MuseUI)
Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})
