import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
        path: '/audience',
        name: 'audience',
        component: () => import('../views/menu/AudienceView.vue')
    },
    {
        path: '/explore',
        name: 'explore',
        component: () => import('../views/menu/ExploreView.vue')
    }
  ]
})

export default router
