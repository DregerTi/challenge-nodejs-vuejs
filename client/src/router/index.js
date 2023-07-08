import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth/',
            redirect: '/auth/login',
            name: 'auth',
            component: () => import('../components/organisms/AuthLayout.vue'),
            children: [
                {
                    path: 'forgot-password',
                    name: 'forgot-password',
                    component: () => import('../views/auth/ForgotPasswordView.vue')
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/auth/LoginView.vue')
                },
                {
                    path: 'signup',
                    name: 'signup',
                    component: () => import('../views/auth/SignupView.vue')
                }
            ]
        },
        {
            path: '/analytics/:site/',
            redirect: '/analytics/:site/dashboard',
            name: 'analytics',
            component: () => import('../components/organisms/AnalyticsLayout.vue'),
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('../views/DashboardView.vue')
                },
                {
                    path: 'audience/',
                    name: 'audience',
                    children: [
                        {
                            path: '',
                            name: 'audience',
                            component: () => import('../views/menu/AudienceView.vue')
                        },
                        {
                            path: 'total-users',
                            name: 'total-users',
                            component: () => import('../views/event/TotalUserView.vue')
                        },
                        {
                            path: 'new-users',
                            name: 'new-users',
                            component: () => import('../views/event/NewUserView.vue')
                        },
                        {
                            path: 'active-users',
                            name: 'active-users',
                            component: () => import('../views/event/ActiveUserView.vue')
                        },
                        {
                            path: 'sessions',
                            name: 'sessions',
                            component: () => import('../views/event/SessionView.vue')
                        },
                        {
                            path: 'avg-sessions',
                            name: 'avg-sessions',
                            component: () => import('../views/event/SessionDurationView.vue')
                        },
                        {
                            path: 'bounce-rate',
                            name: 'bounce-rate',
                            component: () => import('../views/event/BounceRateView.vue')
                        },
                        {
                            path: 'page-views',
                            name: 'page-views',
                            component: () => import('../views/event/PageViewView.vue')
                        },
                        {
                            path: 'devices',
                            name: 'devices',
                            component: () => import('../views/event/DeviceView.vue')
                        },
                        {
                            path: 'localisation',
                            name: 'localisation',
                            component: () => import('../views/event/LocalisationView.vue')
                        }
                    ]
                },
                {
                    path: 'explore',
                    name: 'explore',
                    component: () => import('../views/menu/ExploreView.vue')
                }
            ]
        }
    ]
})

export default router
