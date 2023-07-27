import * as dashboardItemService from '@/services/dashboardItemService'
import { getTags } from '@/services/tagService'
import { getConversionTunnels } from '@/services/conversionTunnelService'

const state = {
    dashboardItems: [],
    dashboardItemsErrors: [],
    possibleKpis: []
}

const getters = {
    getDashboardItems: (state) => state.dashboardItems,
    getDashboardItemsErrors: (state) => state.dashboardItemsErrors,
    getPossibleKpis: (state) => state.possibleKpis
}

const actions = {
    async createDashboardItem({ commit }, _dashboardItem) {
        try {
            const dashboardItem = await dashboardItemService.createDashboardItem(_dashboardItem)
            commit('setDashboardItems', dashboardItem)
            const dashboardItems = await dashboardItemService.getDashboardItems()
            commit('setDashboardItems', dashboardItems)
        } catch (error) {
            commit('setDashboardItemsErrors', error)
        }
    },
    async getDashboardItems({ commit }) {
        try {
            const dashboardItems = await dashboardItemService.getDashboardItems()
            commit('setDashboardItems', dashboardItems)
        } catch (error) {
            commit('setDashboardItemsErrors', error)
        }
    },
    async deleteDashboardItem({ commit }, id) {
        try {
            await dashboardItemService.deleteDashboardItem(id)
            const dashboardItems = await dashboardItemService.getDashboardItems()
            commit('setDashboardItems', dashboardItems)
        } catch (error) {
            commit('setDashboardItemsErrors', error)
        }
    },
    async updateDashboardItem({ commit }, _dashboardItem) {
        try {
            if (_dashboardItem.kpi.includes('oneTag')) {
                const tagId = _dashboardItem.kpi.split(',')[1]
                _dashboardItem.kpi = 'oneTag'
                _dashboardItem.tagId = tagId
            } else if (_dashboardItem.kpi.includes('conversionTunnel')) {
                const conversionTunnelId = _dashboardItem.kpi.split(',')[1]
                _dashboardItem.kpi = 'conversionTunnel'
                _dashboardItem.conversionTunnelId = conversionTunnelId
            }
            await dashboardItemService.updateDashboardItem(_dashboardItem)

            const dashboardItems = await dashboardItemService.getDashboardItems()
            commit('setDashboardItems', dashboardItems)
        } catch (error) {
            commit('setDashboardItemsErrors', error)
        }
    },
    async getPossibleKpis({ commit }) {
        try {
            const kpis = [
                {
                    id: 'pageView',
                    name: 'Page Views'
                },
                {
                    id: 'totalUsers',
                    name: 'Total Users'
                },
                {
                    id: 'newUsers',
                    name: 'New Users'
                },
                {
                    id: 'sessions',
                    name: 'Sessions'
                },
                {
                    id: 'avgTimeBySession',
                    name: 'Average Time By Session'
                },
                {
                    id: 'activeUsers',
                    name: 'Active Users'
                },
                {
                    id: 'viewerByCountry',
                    name: 'Viewer By Country'
                },
                {
                    id: 'viewerByOs',
                    name: 'Viewer By OS'
                }
            ]
            const tags = await getTags()
            const tagKpis = tags.map((tag) => {
                return {
                    id: `oneTag,${tag.id}`,
                    name: `Tag ${tag.name}`
                }
            })
            const conversionTunnels = await getConversionTunnels()
            const conversionTunnelKpis = conversionTunnels.map((conversionTunnel) => {
                return {
                    id: `conversionTunnel,${conversionTunnel.id}`,
                    name: `Conversion Tunnel ${conversionTunnel.name}`
                }
            })

            commit('setPossibleKpis', [...kpis, ...conversionTunnelKpis, ...tagKpis])
        } catch (error) {
            commit('setDashboardItemsErrors', error)
        }
    }
}

const mutations = {
    setDashboardItems: (state, dashboardItems) => (state.dashboardItems = dashboardItems),
    setDashboardItemsErrors: (state, dashboardItemsErrors) =>
        (state.dashboardItemsErrors = dashboardItemsErrors),
    setPossibleKpis: (state, possibleKpis) => (state.possibleKpis = possibleKpis)
}

export default {
    state,
    getters,
    actions,
    mutations
}
