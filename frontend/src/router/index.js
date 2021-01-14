import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/restore/:token',
    name: 'Restore',
    component: () => import('../views/Restore.vue')
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('../views/Forgot.vue')
  },
  {
    path: '/show/:slug',
    name: 'Show',
    component: () => import('../views/Show.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
