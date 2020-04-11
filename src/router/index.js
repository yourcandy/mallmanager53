import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    },
    {
      name:'home',
      path: '/',
      component:Home,
      children:[
        {name:'users',path:'users',component:Users}
      ]
    }
  ]
})
