import * as userService from '@/services/userService'
import router from '@/router'

const state = {
    user: null
}

const getters = {
    user: (state) => state.user
}

const actions = {
    async getMe({ commit }) {
        try {
            const user = await userService.getMe()
            commit('setMe', user)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    }
}

const mutations = {
    setMe: (state, user) => {
        state.user = user
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
