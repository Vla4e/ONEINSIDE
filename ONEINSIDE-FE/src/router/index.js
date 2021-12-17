import Vue from 'vue'
import VueRouter from 'vue-router'
import Projects from '@/views/Projects.vue'
import Developers from '@/views/Developers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Projects
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/developers',
    name: 'Developers',
    component: Developers
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
