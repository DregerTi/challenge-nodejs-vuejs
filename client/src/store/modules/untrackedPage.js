import * as untrackedPageService from '@/services/untrackedPageService'

import router from '@/router'

const state = {
    untrackedPage: null,
    untrackedPages: [],
    untrackedPagesErrors: []
}

const getters = {
    untrackedPage: (state) => state.untrackedPage,
    untrackedPages: (state) => state.untrackedPages,
    untrackedPagesErrors: (state) => state.untrackedPagesErrors
}

const actions = {
    async createUntrackedPage({ commit }, _untrackedPage) {
        try {
            const untrackedPage = await untrackedPageService.createUntrackedPage(_untrackedPage)
            commit('setUntrackedPage', untrackedPage)
            const UntrackedPages = await untrackedPageService.getUntrackedPages()
            commit('setUntrackedPages', UntrackedPages)
            await router.push({
                name: 'untracked-page-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: untrackedPage.id
                }
            })
        } catch (error) {
            commit('setUntrackedPagesErrors', error)
        }
    },
    async getUntrackedPages({ commit }) {
        try {
            const untrackedPages = await untrackedPageService.getUntrackedPages()
            commit('setUntrackedPages', untrackedPages)
        } catch (error) {
            commit('setUntrackedPagesErrors', error)
        }
    },
    async updateUntrackedPage({ commit }, _untrackedPage) {
        try {
            const untrackedPage = await untrackedPageService.updateUntrackedPage(_untrackedPage)
            commit('setUntrackedPage', untrackedPage)
            const untrackedPages = await untrackedPageService.getUntrackedPages()
            commit('setUntrackedPages', untrackedPages)
            await router.push({
                name: 'untracked-page-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: router.currentRoute.value.params.id
                }
            })
        } catch (error) {
            commit('setUntrackedPagesErrors', error)
        }
    },
    async deleteUntrackedPage({ commit }, id) {
        try {
            await untrackedPageService.deleteUntrackedPage(id)
            const untrackedPages = await untrackedPageService.getUntrackedPages()
            commit('setUntrackedPages', untrackedPages)
            await router.push({
                name: 'untracked-page',
                params: { site: router.currentRoute.value.params.site }
            })
        } catch (error) {
            commit('setUntrackedPagesErrors', error)
        }
    },
    async getUntrackedPage({ commit }, id) {
        try {
            const untrackedPage = await untrackedPageService.getUntrackedPage(id)
            commit('setUntrackedPage', untrackedPage)
        } catch (error) {
            commit('setUntrackedPagesErrors', error)
        }
    }
}

const mutations = {
    setUntrackedPage(state, untrackedPage) {
        state.untrackedPage = untrackedPage
    },
    setUntrackedPages(state, untrackedPages) {
        state.untrackedPages = untrackedPages
    },
    setUntrackedPagesErrors(state, errors) {
        state.untrackedPagesErrors = errors
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
