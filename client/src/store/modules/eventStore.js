import * as eventService from '@/services/eventService'
import { getViewPerPage } from '@/services/eventService'

const state = {
    viewPerPages: null,
    sessions: null,
    sessionsDuration: null,
    activeUsers: null,
    rangeDate: []
}

const getters = {
    viewPerPages: (state) => state.viewPerPages,
    rangeDate: (state) => state.rangeDate,
    sessions: (state) => state.sessions,
    sessionsDuration: (state) => state.sessionsDuration,
    activeUsers: (state) => state.activeUsers
}

const actions = {
    async getViewPerPages({ commit }) {
        try {
            const viewPerPages = await eventService.getViewPerPage()
            commit('setViewPerPages', viewPerPages)
        } catch (error) {}
    },
    async getSessions({ commit }, _rangeDate) {
        try {
            const sessions = await eventService.getSessions(_rangeDate)

            const listener = function (event) {
                commit('setSessions', event)
            }
            sessions.addEventListener('open', listener)
            sessions.addEventListener('message', listener)
            sessions.addEventListener('error', listener)
        } catch (error) {}
    },
    async getSessionsDuration({ commit }) {
        try {
            const sessionsDuration = await eventService.getSessionsDuration()
            commit('setSessionsDuration', sessionsDuration)
        } catch (error) {}
    },
    async getActiveUsers({ commit }) {
        try {
            const activeUsers = await eventService.getActiveUsers()
            commit('setActiveUsers', activeUsers)
        } catch (error) {}
    }
}

const mutations = {
    setViewPerPages(state, viewPerPages) {
        state.viewPerPages = viewPerPages
    },
    setSessions(state, sessions) {
        state.sessions = sessions
    },
    setSessionsDuration(state, sessionsDuration) {
        state.sessionsDuration = sessionsDuration
    },
    setActiveUsers(state, activeUsers) {
        state.activeUsers = activeUsers
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
