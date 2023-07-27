import * as siteService from '@/services/siteService'
import { getSiteUser } from '@/services/siteService'
import router from '@/router'

const state = {
    siteUsers: null,
    siteUser: null,
    sites: null,
    site: {
        name: null,
        url: null
    },
    siteErrors: null,
    apiKey: '*****************',
    role: null
}

const getters = {
    siteUsers: (state) => state.siteUsers,
    siteUser: (state) => state.siteUser,
    sites: (state) => state.sites,
    site: (state) => state.site,
    siteErrors: (state) => state.siteErrors,
    apiKey: (state) => state.apiKey,
    role: (state) => state.role
}

const actions = {
    async getSiteUsers({ commit }) {
        try {
            const siteUsers = await siteService.getSiteUsers()
            commit('setSiteUsers', siteUsers)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async getSites({ commit }) {
        try {
            const sites = await siteService.getSites()
            commit('setSites', sites)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async getSite({ commit }, id) {
        try {
            const site = await siteService.getSite(id)
            site.apiKey = '******************' + site.apiKey.substring(18)
            commit('setSite', site)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async getSiteUser({ commit }, email) {
        try {
            const siteUser = await siteService.getSiteUser(email)
            commit('setSiteUser', siteUser)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async addSiteUser({ commit }, data) {
        try {
            await siteService.addSiteUser(data)
            const siteUsers = await siteService.getSiteUsers()
            commit('setSiteUsers', siteUsers)
            await router.push({
                name: 'Website-users',
                params: {
                    site: router.currentRoute.value.params.site
                }
            })
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async updateSiteUser({ commit }, data) {
        try {
            await siteService.updateSiteUser(data)
            const siteUsers = await siteService.getSiteUsers()
            commit('setSiteUsers', siteUsers)
            await router.push({
                name: 'Website-users',
                params: {
                    site: router.currentRoute.value.params.site
                }
            })
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async deleteSiteUser({ commit }, id) {
        try {
            await siteService.deleteSiteUser(id)
            const siteUsers = await siteService.getSiteUsers()
            commit('setSiteUsers', siteUsers)
            await router.push({
                name: 'Website-users',
                params: {
                    site: router.currentRoute.value.params.site
                }
            })
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async createSite({ commit }, _site) {
        try {
            const site = await siteService.createSite(_site)
            commit('setSite', site)
            commit('setSiteErrors', null)
            router.push({
                name: 'dashboard',
                params: {
                    site: site.id
                }
            })
        } catch (error) {
            commit('setSiteErrors', error)
        }
    },
    async updateSite({ commit }, _site) {
        try {
            await siteService.updateSite(_site)
            const site = await siteService.getSiteUsers()
            commit('setSite', site)
            commit('setSiteErrors', null)
            await router.push({
                name: 'dashboard',
                params: {
                    site: site.id
                }
            })
        } catch (error) {
            commit('setSiteErrors', error)
        }
    },
    async refreshApiKey({ commit }) {
        try {
            const site = await siteService.refreshApiKey(router.currentRoute.value.params.site)
            commit('setSite', site)
            commit('setSiteErrors', null)
        } catch (error) {
            commit('setSiteErrors', error)
        }
    },
    async getRole({ commit }) {
        try {
            const role = await siteService.getRole()
            commit('setRole', role)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
    async validateInvitation({ commit }, data) {
        try {
            await siteService.validateInvitation(data)

            router.push({ name: 'Website-users-invitation-success' })
        } catch (error) {
            router.push({ name: 'Website-users-invitation-error' })
            //commit('setUntrackedPagesErrors', error)
        }
    }
}

const mutations = {
    setSiteUsers(state, siteUsers) {
        state.siteUsers = siteUsers
    },
    setSiteUser(state, siteUser) {
        state.siteUser = siteUser
    },
    setSites(state, sites) {
        state.sites = sites
    },
    setSite(state, site) {
        state.site = site
    },
    setSiteErrors(state, siteErrors) {
        state.siteErrors = siteErrors
    },
    setApiKey(state, apiKey) {
        state.apiKey = apiKey
    },
    setRole(state, role) {
        state.role = role
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
