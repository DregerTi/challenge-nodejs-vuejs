import * as siteService from '@/services/siteService'

const state = {
    siteUsers: null
}

const getters = {
    siteUsers: (state) => state.siteUsers
}

const actions = {
    async getSiteUsers({ commit }) {
        try {
            const siteUsers = await siteService.getSiteUsers()
            commit('setSiteUsers', siteUsers)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    }
}

const mutations = {
    setSiteUsers(state, siteUsers) {
        state.siteUsers = siteUsers
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
