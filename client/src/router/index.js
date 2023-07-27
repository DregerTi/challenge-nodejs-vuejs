import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const site = computed(() => store.state.siteStore.site)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/error',
            name: 'error',
            component: () => import('../views/ErrorView.vue')
        },
        {
            path: '/invitation/:id',
            name: 'Website-users-invitation-show',
            component: () =>
                import(
                    '../views/setting/websiteUser/WebsiteUserInvitationView.vue'
                )
        },
        {
            path: '/invitation/success',
            name: 'Website-users-invitation-success',
            component: () =>
                import(
                    '../views/setting/websiteUser/WebsiteUserSuccessView.vue'
                )
        },
        {
            path: '/invitation/error',
            name: 'Website-users-invitation-error',
            component: () =>
                import(
                    '../views/setting/websiteUser/WebsiteUserErrorView.vue'
                )
        },
        {
            path: '/auth/',
            redirect: '/auth/login',
            name: 'auth',
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token')) {
                    next({ name: 'dashboard' })
                } else {
                    next()
                }
            },
            component: () => import('../components/templates/AuthLayout.vue'),
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
            path: '/analytics/',
            name: 'analytics',
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem('token')) {
                    next({ name: 'login' })
                } else {
                    next()
                }
            },
            component: () => import('../components/templates/AnalyticsLayout.vue'),
            children: [
                {
                    path: ':site?/dashboard',
                    name: 'dashboard',
                    component: () => import('../views/DashboardView.vue')
                },
                {
                    path: ':site?/audience/',
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
                            path: 'sessions',
                            name: 'sessions',
                            component: () => import('../views/event/audience/SessionView.vue')
                        },
                        {
                            path: 'avg-sessions',
                            name: 'avg-sessions',
                            component: () =>
                                import('../views/event/audience/SessionDurationView.vue')
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
                    path: ':site?/explore/',
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
                            component: () =>
                                import(
                                    '../views/event/explore/conversionTunnel/ConversionTunnelView.vue'
                                ),
                            children: [
                                {
                                    path: ':id',
                                    name: 'conversion-tunnel-show',
                                    component: () =>
                                        import(
                                            '../views/event/explore/conversionTunnel/ConversionTunnelShowView.vue'
                                        )
                                },
                                {
                                    path: ':id/edit',
                                    name: 'conversion-tunnel-edit',
                                    component: () =>
                                        import(
                                            '../views/event/explore/conversionTunnel/ConversionTunnelEditView.vue'
                                        )
                                },
                                {
                                    path: ':id/settings',
                                    name: 'conversion-tunnel-settings',
                                    component: () =>
                                        import(
                                            '../views/event/explore/conversionTunnel/ConversionTunnelSettingsView.vue'
                                        )
                                },
                                {
                                    path: ':id/delete',
                                    name: 'conversion-tunnel-delete',
                                    component: () =>
                                        import(
                                            '../views/event/explore/conversionTunnel/ConversionTunnelDeleteView.vue'
                                        )
                                },
                                {
                                    path: 'create',
                                    name: 'conversion-tunnel-create',
                                    component: () =>
                                        import(
                                            '../views/event/explore/conversionTunnel/ConversionTunnelCreateView.vue'
                                        )
                                }
                            ]
                        },
                        {
                            path: 'heatmap/',
                            name: 'heatmap',
                            component: () =>
                                import('../views/event/explore/heatmap/HeatmapView.vue'),
                            children: [
                                {
                                    path: ':id/:size',
                                    name: 'heatmap-show',
                                    component: () =>
                                        import('../views/event/explore/heatmap/HeatmapShowView.vue')
                                }
                            ]
                        },
                        {
                            path: 'tag/',
                            name: 'tag',
                            component: () => import('../views/event/explore/tag/TagView.vue'),
                            children: [
                                {
                                    path: ':id',
                                    name: 'tag-show',
                                    component: () =>
                                        import('../views/event/explore/tag/TagShowView.vue')
                                },
                                {
                                    path: ':id/edit',
                                    name: 'tag-edit',
                                    component: () =>
                                        import('../views/event/explore/tag/TagEditView.vue')
                                },
                                {
                                    path: ':id/delete',
                                    name: 'tag-delete',
                                    component: () =>
                                        import('../views/event/explore/tag/TagDeleteView.vue')
                                },
                                {
                                    path: 'create',
                                    name: 'tag-create',
                                    component: () =>
                                        import('../views/event/explore/tag/TagCreateView.vue')
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'me/',
                    name: 'me',
                    children: [
                        {
                            path: '',
                            name: 'me',
                            component: () => import('../views/auth/MeView.vue')
                        },
                        {
                            path: 'edit',
                            name: 'me-update',
                            component: () => import('../views/auth/MeUpdateView.vue')
                        }
                    ]
                },
                {
                    path: 'setting/',
                    name: 'setting',
                    children: [
                        {
                            path: '',
                            name: 'setting',
                            component: () => import('../views/setting/SettingView.vue')
                        },
                        {
                            path: 'create',
                            name: 'site-create',
                            component: () =>
                                import('../views/setting/websiteInfo/WebsiteCreateView.vue')
                        },
                        {
                            path: ':site?/website-info/',
                            name: 'website-info',
                            children: [
                                {
                                    path: '',
                                    name: 'website-info',
                                    component: () =>
                                        import('../views/setting/websiteInfo/WebsiteInfoView.vue')
                                },
                                {
                                    path: 'edit',
                                    name: 'website-info-edit',
                                    component: () =>
                                        import(
                                            '../views/setting/websiteInfo/WebsiteInfoUpdateView.vue'
                                        )
                                }
                            ]
                        },
                        {
                            path: ':site?/api-key',
                            name: 'api-key',
                            component: () => import('../views/setting/ApiKeyView.vue')
                        },
                        {
                            path: ':site?/website-users/',
                            name: 'website-users',
                            children: [
                                {
                                    path: '',
                                    name: 'Website-users',
                                    component: () =>
                                        import('../views/setting/websiteUser/WebsiteUserView.vue')
                                },
                                {
                                    path: ':id/edit',
                                    name: 'Website-users-edit',
                                    component: () =>
                                        import(
                                            '../views/setting/websiteUser/WebsiteUserEditView.vue'
                                        )
                                },
                                {
                                    path: ':id/delete',
                                    name: 'Website-users-delete',
                                    component: () =>
                                        import(
                                            '../views/setting/websiteUser/WebsiteUserDeleteView.vue'
                                        )
                                },
                                {
                                    path: 'invite',
                                    name: 'Website-users-invitation',
                                    component: () =>
                                        import(
                                            '../views/setting/websiteUser/WebsiteUserCreateView.vue'
                                        )
                                },
                            ]
                        },
                        {
                            path: ':site?/untracked-page/',
                            name: 'untracked-page',
                            component: () =>
                                import('../views/setting/untrackedPage/UntrackedPageView.vue'),
                            children: [
                                {
                                    path: ':id',
                                    name: 'untracked-page-show',
                                    component: () =>
                                        import(
                                            '../views/setting/untrackedPage/UntrackedPageShowView.vue'
                                        )
                                },
                                {
                                    path: ':id/edit',
                                    name: 'untracked-page-edit',
                                    component: () =>
                                        import(
                                            '../views/setting/untrackedPage/UntrackedPageEditView.vue'
                                        )
                                },
                                {
                                    path: ':id/delete',
                                    name: 'untracked-page-delete',
                                    component: () =>
                                        import(
                                            '../views/setting/untrackedPage/UntrackedPageDeleteView.vue'
                                        )
                                },
                                {
                                    path: 'add',
                                    name: 'untracked-page-add',
                                    component: () =>
                                        import(
                                            '../views/setting/untrackedPage/UntrackedPageCreateView.vue'
                                        )
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
})

export default router
