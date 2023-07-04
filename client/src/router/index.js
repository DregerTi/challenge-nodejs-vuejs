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
    },
    {
        path: '/total-users',
        name: 'total-users',
        component: () => import('../views/event/TotalUserView.vue')
    },
    {
        path: '/new-users',
        name: 'new-users',
        component: () => import('../views/event/NewUserView.vue')
    },
    {
        path: '/active-users',
        name: 'active-users',
        component: () => import('../views/event/ActiveUserView.vue')
    },
    {
        path: '/sessions',
        name: 'sessions',
        component: () => import('../views/event/SessionView.vue')
    },
    {
        path: '/avg-sessions',
        name: 'avg-sessions',
        component: () => import('../views/event/SessionDurationView.vue')
    },
    {
        path: '/bounce-rate',
        name: 'bounce-rate',
        component: () => import('../views/event/BounceRateView.vue')
    },
    {
        path: '/page-views',
        name: 'page-views',
        component: () => import('../views/event/PageViewView.vue')
    },
    {
        path: '/devices',
        name: 'devices',
        component: () => import('../views/event/DeviceView.vue')
    },
    {
        path: '/localisation',
        name: 'localisation',
        component: () => import('../views/event/LocalisationView.vue')
    }
  ]
})

export default router
