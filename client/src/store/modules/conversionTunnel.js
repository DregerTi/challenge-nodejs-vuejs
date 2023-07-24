import * as conversionTunnelService from '@/services/conversionTunnelService'
import router from '@/router'

const state = {
    conversionTunnel: null,
    conversionTunnels: [],
    errors: []
}

const getters = {
    conversionTunnel: (state) => state.conversionTunnel,
    conversionTunnels: (state) => state.conversionTunnels,
    errors: (state) => state.errors
}

const actions = {
    async createConversionTunnel({ commit }, _conversionTunnel) {
        try {
            const conversionTunnel = await conversionTunnelService.createConversionTunnel(
                _conversionTunnel
            )
            commit('setConversionTunnel', conversionTunnel)
            const ConversionTunnels = await conversionTunnelService.getConversionTunnels()
            commit('setConversionTunnels', ConversionTunnels)
            await router.push({
                name: 'untracked-page-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: conversionTunnel.id
                }
            })
        } catch (error) {
            commit('setErrors', error)
        }
    },
    async getConversionTunnels({ commit }) {
        try {
            const conversionTunnels = await conversionTunnelService.getConversionTunnels()
            commit('setConversionTunnels', conversionTunnels)
        } catch (error) {
            commit('setErrors', error)
        }
    },
    async updateConversionTunnel({ commit }, _conversionTunnel) {
        try {
            const conversionTunnel = await conversionTunnelService.updateConversionTunnel(
                _conversionTunnel
            )
            commit('setConversionTunnel', conversionTunnel)
            const conversionTunnels = await conversionTunnelService.getConversionTunnels()
            commit('setConversionTunnels', conversionTunnels)
            await router.push({
                name: 'untracked-page-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: router.currentRoute.value.params.id
                }
            })
        } catch (error) {
            commit('setErrors', error)
        }
    },
    async deleteConversionTunnel({ commit }, id) {
        try {
            await conversionTunnelService.deleteConversionTunnel(id)
            const conversionTunnels = await conversionTunnelService.getConversionTunnels()
            commit('setConversionTunnels', conversionTunnels)
            await router.push({
                name: 'untracked-page',
                params: { site: router.currentRoute.value.params.site }
            })
        } catch (error) {
            commit('setErrors', error)
        }
    },
    async getConversionTunnel({ commit }, id) {
        try {
            const conversionTunnel = await conversionTunnelService.getConversionTunnel(id)
            commit('setConversionTunnel', conversionTunnel)
        } catch (error) {
            commit('setErrors', error)
        }
    }
}

const mutations = {
    setConversionTunnel(state, conversionTunnel) {
        state.conversionTunnel = conversionTunnel
    },
    setConversionTunnels(state, conversionTunnels) {
        state.conversionTunnels = conversionTunnels
    },
    setErrors(state, errors) {
        state.errors = errors
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
