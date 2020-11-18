import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Motos from '@/components/Motos.vue'
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'
import Profile from '@/components/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/motospage',
      name: 'Motos',
      component: Motos
    },
    {
      path: '/',
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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
