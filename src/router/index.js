// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import('../views/start.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import('../views/adminLogin.vue'),
  },
  {
    path: '/igraonica',
    name: 'igraonica',
    component: () => import('../views/igraonica.vue'),
  },
  {
    path: '/dvoriste',
    name: 'dvoriste',
    component: () => import('../views/dvoriste.vue'),
  },
  {
    path: '/apartman',
    name: 'apartman',
    component: () => import('../views/apartman.vue'),
  },
  {
    path: '/bazen',
    name: 'bazen',
    component: () => import('../views/bazen.vue')},
    {
      path: '/studio',
      name: 'studio',
      component: () => import('../views/studio.vue'),
    },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
