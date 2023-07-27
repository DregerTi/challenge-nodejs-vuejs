import * as siteService from '@/services/siteService'

const state = {
    siteUsers: null,
    siteUser: null
}

const getters = {
    siteUsers: (state) => state.siteUsers,
    siteUser: (state) => state.siteUser
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
    async getSiteUser({ commit }, email) {
        try {
            const siteUser = await siteService.getSiteUser(email)
            commit('setSiteUser', siteUser)
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
    }
}

const mutations = {
    setSiteUsers(state, siteUsers) {
        state.siteUsers = siteUsers
    },
    setSiteUser(state, siteUser) {
        state.siteUser = siteUser
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
