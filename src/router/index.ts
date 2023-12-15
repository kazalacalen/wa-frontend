import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import( '../views/SignUp.vue')

  },

  {
    path: '/LoginPage',
    name: 'LoginPage',

    component: () => import( '../views/LoginPage.vue')
  },

  {
    path: '/HomePage',
    name: 'HomePage',

    component: () => import( '../views/HomePage.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
