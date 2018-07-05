import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      namh: 'Home',
      component: Home,
      props: (route) => ({ query: route.query })
    }
  ]
})
