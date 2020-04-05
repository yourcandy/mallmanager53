import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Login from '@/components/login/login.vue'
export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    }
  ]
})
