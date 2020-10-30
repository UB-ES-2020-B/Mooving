import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Motos from '@/components/Motos.vue'
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Motos',
      name: 'Motos',
      component: Motos
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/userregister',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/userlogin',
      name: 'Login',
      component: Login
    }
  ]
})
