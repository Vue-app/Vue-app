import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import message from '../pages/message.vue'
import login from '../pages/login.vue'
import my from '../pages/my.vue'
import more from '../pages/more.vue'
import publish from '../pages/publish.vue'
import content from '../pages/content.vue'
import people from '../pages/people.vue'

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
    },
    {
      path: '/Vue-app/src/pages/more',
      name: 'more',
      component: more
    },
    {
      path: '/Vue-app/src/pages/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/Vue-app/src/pages/content',
      name: 'content',
      component: content
    },
    {
      path: '/Vue-app/src/pages/people',
      name: 'people',
      component: people
    }
  ]
})
