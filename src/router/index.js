import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import message from '../pages/message.vue'
import login from '../pages/login.vue'
import my from '../pages/my.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/Vue-app/src/pages/message',
      name: 'message',
      component: message
    },
    {
      path: '/Vue-app/src/pages/login',
      name: 'login',
      component: login
    },
    {
      path: '/Vue-app/src/pages/my',
      name: 'my',
      component: my
    }
  ]
})
