import * as eventService from '@/services/eventService'
import { getViewPerPage } from '@/services/eventService'

const state = {
    viewPerPages: null,
    rangeDate: {}
}

const getters = {
    viewPerPages: (state) => state.viewPerPages,
    rangeDate: (state) => state.rangeDate
}

const actions = {
    async getViewPerPages({ commit }) {
        try {
            const viewPerPages = await eventService.getViewPerPage()
            commit('setViewPerPages', viewPerPages)
        } catch (error) {
            //commit('setUntrackedPagesErrors', error)
        }
    },
}

const mutations = {
    setViewPerPages(state, viewPerPages) {
        state.viewPerPages = viewPerPages
    },
    setRangeDate(state, rangeDate) {
        state.rangeDate = rangeDate
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
