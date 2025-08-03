import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/trends',
      name: 'trends',
      component: () => import('@/views/Trends.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('@/views/Discover.vue')
    },
    {
      path: '/challenges',
      name: 'challenges',
      component: () => import('@/views/Challenges.vue')
    },
    {
      path: '/live',
      name: 'live',
      component: () => import('@/views/Live.vue')
    }
  ]
})

export default router