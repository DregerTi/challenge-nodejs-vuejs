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
                            component: () => import('../views/event/audience/AudienceView.vue')
                        },
                        {
                            path: 'total-users',
                            name: 'total-users',
                            component: () => import('../views/event/audience/TotalUserView.vue')
                        },
                        {
                            path: 'new-users',
                            name: 'new-users',
                            component: () => import('../views/event/audience/NewUserView.vue')
                        },
                        {
                            path: 'active-users',
                            name: 'active-users',
                            component: () => import('../views/event/audience/ActiveUserView.vue')
                        },
                        {
                            path: 'sessions',
                            name: 'sessions',
                            component: () => import('../views/event/audience/SessionView.vue')
                        },
                        {
                            path: 'avg-sessions',
                            name: 'avg-sessions',
                            component: () => import('../views/event/audience/SessionDurationView.vue')
                        },
                        {
                            path: 'bounce-rate',
                            name: 'bounce-rate',
                            component: () => import('../views/event/audience/BounceRateView.vue')
                        },
                        {
                            path: 'page-views',
                            name: 'page-views',
                            component: () => import('../views/event/audience/PageViewView.vue')
                        },
                        {
                            path: 'devices',
                            name: 'devices',
                            component: () => import('../views/event/audience/DeviceView.vue')
                        },
                        {
                            path: 'localisation',
                            name: 'localisation',
                            component: () => import('../views/event/audience/LocalisationView.vue')
                        }
                    ]
                },
                {
                    path: 'explore/',
                    name: 'explore',
                    children: [
                        {
                            path: '',
                            name: 'explore',
                            component: () => import('../views/event/explore/ExploreView.vue')
                        },
                        {
                            path: 'conversion-tunnel/',
                            name: 'conversion-tunnel',
                            component: () => import('../views/event/explore/conversionTunnel/ConversionTunnelView.vue'),
                            children: [
                                {
                                    path: ':id',
                                    name: 'conversion-tunnel-show',
                                    component: () => import('../views/event/explore/conversionTunnel/ConversionTunnelShowView.vue')
                                },
                                {
                                    path: ':id/edit',
                                    name: 'conversion-tunnel-edit',
                                    component: () => import('../views/event/explore/conversionTunnel/ConversionTunnelEditView.vue')
                                },
                                {
                                    path: ':id/delete',
                                    name: 'conversion-tunnel-delete',
                                    component: () => import('../views/event/explore/conversionTunnel/ConversionTunnelDeleteView.vue')
                                },
                                {
                                    path: 'create',
                                    name: 'conversion-tunnel-create',
                                    component: () => import('../views/event/explore/conversionTunnel/ConversionTunnelCreateView.vue')
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
})

export default router
