import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/pages',
      name: 'index',
      component: index
    }
  ]
})
