import * as eventService from '@/services/eventService'
import { getViewPerPage } from '@/services/eventService'

const state = {
    viewPerPages: null,
    rangeDate: []
}

const getters = {
    viewPerPages: (state) => state.viewPerPages
}

const actions = {
    async getViewPerPages({ commit }) {
        try {
            const viewPerPages = await eventService.getViewPerPage()
            commit('setViewPerPages', viewPerPages)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    }
}

const mutations = {
    setViewPerPages(state, viewPerPages) {
        state.viewPerPages = viewPerPages
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
