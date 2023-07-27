import * as conversionTunnelService from '@/services/conversionTunnelService'
import router from '@/router'

const state = {
    conversionTunnel: null,
    conversionTunnels: [],
    conversionTunnelsErrors: []
}

const getters = {
    conversionTunnel: (state) => state.conversionTunnel,
    conversionTunnels: (state) => state.conversionTunnels,
    conversionTunnelsErrors: (state) => state.conversionTunnelsErrors
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
                name: 'conversion-tunnel-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: conversionTunnel.id
                }
            })
        } catch (error) {
            commit('setConversionTunnelsErrors', error)
        }
    },
    async getConversionTunnels({ commit }) {
        try {
            const conversionTunnels = await conversionTunnelService.getConversionTunnels()
            commit('setConversionTunnels', conversionTunnels)
        } catch (error) {
            commit('setConversionTunnelsErrors', error)
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
                name: 'conversion-tunnel-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: router.currentRoute.value.params.id
                }
            })
        } catch (error) {
            commit('setConversionTunnelsErrors', error)
        }
    },
    async deleteConversionTunnel({ commit }, id) {
        try {
            await conversionTunnelService.deleteConversionTunnel(id)
            const conversionTunnels = await conversionTunnelService.getConversionTunnels()
            commit('setConversionTunnels', conversionTunnels)
            await router.push({
                name: 'conversion-tunnel',
                params: { site: router.currentRoute.value.params.site }
            })
        } catch (error) {
            commit('setConversionTunnelsErrors', error)
        }
    },
    async getConversionTunnel({ commit }) {
        try {
            const conversionTunnel = await conversionTunnelService.getConversionTunnel()
            commit('setConversionTunnel', conversionTunnel)
        } catch (error) {
            commit('setConversionTunnelsErrors', error)
        }
    },
    async updateConversionTunnelTags({ commit }, data) {
        try {
            await conversionTunnelService.updateConversionTunnelTags(data)
            const conversionTunnel = await conversionTunnelService.getConversionTunnel()
            commit('setConversionTunnel', conversionTunnel)
        } catch (error) {
            commit('setConversionTunnelsErrors', error)
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
    setConversionTunnelsErrors(state, errors) {
        state.conversionTunnelsErrors = errors
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
