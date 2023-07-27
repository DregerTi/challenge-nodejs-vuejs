import { EventSourcePolyfill } from 'event-source-polyfill'
import * as tokenStorage from '@/services/tokenStorage'
import ROUTES from '@/router/routes'
import router from '@/router'
import siteStore from '@/store/modules/siteStore'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const state = {
    viewPerPages: null,
    viewPerPagesBrute: null,
    sessionsBrute: null,
    heatmapPaths: null,
    heatmap: null,
    totalUser: {
        preview: {
            value: 0,
            trend: 0
        },
        chartData: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        }
    },
    newUser: {
        preview: {
            value: 0,
            trend: 0
        },
        chartData: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        }
    },
    sessions: {
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    },
    sessionsDuration: null,
    sessionsDurationBrute: null,
    devices: {
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    },
    devicesBrute: null,
    countries: [['Country', 'Popularity']],
    countriesBrute: null,
    activeUsers: 0,
    rangeDate: [],
    dayList: null
}

const getters = {
    viewPerPages: (state) => state.viewPerPages,
    rangeDate: (state) => state.rangeDate,
    sessions: (state) => state.sessions,
    sessionsDuration: (state) => state.sessionsDuration,
    activeUsers: (state) => state.activeUsers,
    devices: (state) => state.devices,
    countries: (state) => state.countries,
    heatmapPaths: (state) => state.heatmapPaths,
    heatmap: (state) => state.heatmap,
    totalUser: (state) => state.totalUser,
    newUser: (state) => state.newUser
}

let eventSourceSession = null
let eventSourceDevice = null
let eventSourceCountry = null
let eventSourceSessionDuration = null
let eventSourceViewPerPages = null
let eventSourceHeatmapPaths = null
let eventSourceHeatmap = null
let eventSourceTotalUser = null
let eventSourceNewUser = null
let eventSourceActiveUsers = null

const actions = {
    async closeEventSourceTotalUser() {
        await eventSourceTotalUser.close()
        eventSourceTotalUser = null
    },
    async closeEventSourceNewUser() {
        await eventSourceNewUser.close()
        eventSourceNewUser = null
    },
    async closeEventSourceSession() {
        await eventSourceSession.close()
        eventSourceSession = null
    },
    async closeEventSourceSessionDuration() {
        await eventSourceSessionDuration.close()
        eventSourceSessionDuration = null
    },
    async closeEventSourceViewPerPages() {
        await eventSourceViewPerPages.close()
        eventSourceViewPerPages = null
    },
    async closeEventSourceDevice() {
        await eventSourceDevice.close()
        eventSourceDevice = null
    },
    async closeEventSourceHeatmapPaths() {
        await eventSourceHeatmapPaths.close()
        eventSourceHeatmapPaths = null
    },
    async closeEventSourceHeatmap() {
        await eventSourceHeatmap.close()
        eventSourceHeatmap = null
    },
    async closeEventSourceCountry() {
        await eventSourceCountry.close()
        eventSourceCountry = null
    },
    async getSessions({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_SESSION(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceSession = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })

            const listener = function (event) {
                let eventBrute = JSON.parse(event.data)
                const { totalSessionsCurrent, totalSessionsPrevious } = eventBrute
                const trend = totalSessionsCurrent > totalSessionsPrevious ? 'up' : 'down'
                const differencePercentage =
                    ((totalSessionsCurrent - totalSessionsPrevious) / totalSessionsPrevious) * 100
                const description = trend === 'up' ? `more than last time` : `less than last time`
                const sessionsBrute = {
                    trend: trend,
                    value: totalSessionsCurrent,
                    lastPeriode: differencePercentage.toFixed(2),
                    description: description
                }

                commit('setSessionsBrute', sessionsBrute)

                const dayList = state.dayList
                const totalList = dayList.map((date) => {
                    const foundDay = JSON.parse(event.data).dailySessions.find(
                        (item) => item.date === date
                    )
                    return foundDay ? parseInt(foundDay.totalSessions) : 0
                })
                const labels = dayList.map((date) => date.replace(/^\d{4}-/, ''))
                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Sessions',
                            data: totalList,
                            backgroundColor: '#a8dae3',
                            borderColor: '#a8dae3',
                            borderWidth: 1
                        }
                    ]
                }

                commit('setSessions', chartData)
            }

            //eventSourceSession.addEventListener('open', listener)
            eventSourceSession.addEventListener('message', listener)
            eventSourceSession.addEventListener('error', listener)
        } catch (error) {}
    },
    async getSessionsDuration({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_SESSION_DURATION(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            const eventSourceSessionDuration = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })

            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }

                let eventBrute = JSON.parse(event.data)
                let { avgTimeCurrentPeriod, avgTimePreviousPeriod } = eventBrute
                avgTimeCurrentPeriod =
                    avgTimeCurrentPeriod[0] != undefined
                        ? avgTimeCurrentPeriod[0].averageDuration
                        : 0
                avgTimePreviousPeriod =
                    avgTimePreviousPeriod[0] != undefined
                        ? avgTimePreviousPeriod[0].averageDuration
                        : 0
                const trend = avgTimeCurrentPeriod > avgTimePreviousPeriod ? 'up' : 'down'
                const description = trend === 'up' ? `more than last time` : `less than last time`
                const sessionsDurationBrute = {
                    trend: trend,
                    value: avgTimeCurrentPeriod,
                    description: description
                }
                commit('setSessionsDurationBrute', sessionsDurationBrute)

                const dayList = state.dayList
                const totalList = dayList.map((date) => {
                    const foundDay = JSON.parse(event.data).dailyAvgTime.find(
                        (item) => item.date === date
                    )
                    return foundDay ? parseInt(foundDay.averageDuration) : 0
                })

                const labels = dayList.map((date) => date.replace(/^\d{4}-/, ''))
                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Sessions duration',
                            data: totalList,
                            backgroundColor: '#a8dae3',
                            borderColor: '#a8dae3',
                            borderWidth: 1
                        }
                    ]
                }

                commit('setSessionsDuration', chartData)
            }
            //eventSourceSessionDuration.addEventListener('open', listener)
            eventSourceSessionDuration.addEventListener('message', listener)
            eventSourceSessionDuration.addEventListener('error', listener)
        } catch (error) {}
    },
    async getDevices({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_DEVICE(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceDevice = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })

            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }

                let eventBrute = JSON.parse(event.data)
                const totalViewers = eventBrute.reduce((total, item) => total + item.nbViewers, 0)
                const devicesBrute = eventBrute.map((item) => ({
                    title: item.system,
                    value: item.nbViewers,
                    ratio: ((item.nbViewers / totalViewers) * 100).toFixed(2)
                }))
                commit('setDevicesBrute', devicesBrute)

                const osList = JSON.parse(event.data)
                const labels = osList.map((item) => item.system)
                const data = osList.map((item) => item.nbViewers)

                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: [
                                '#a8dae3',
                                '#3a93a6',
                                '#216b88',
                                '#0f4e5b',
                                '#37737e',
                                '#4c8f96',
                                '#0c5665'
                            ],
                            borderColor: [
                                '#a8dae3',
                                '#3a93a6',
                                '#216b88',
                                '#0f4e5b',
                                '#37737e',
                                '#4c8f96',
                                '#0c5665'
                            ],
                            borderWidth: 1
                        }
                    ]
                }

                commit('setDevices', chartData)
            }
            //eventSourceDevice.addEventListener('open', listener)
            eventSourceDevice.addEventListener('message', listener)
            eventSourceDevice.addEventListener('error', listener)
        } catch (error) {}
    },
    async getCountries({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_COUNTRY(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceCountry = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })

            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }

                let eventBrute = JSON.parse(event.data)
                const totalViewers = eventBrute.reduce((total, item) => total + item.nbViewers, 0)
                const countriesBrute = eventBrute.map((item) => ({
                    title: item.country,
                    value: item.nbViewers,
                    ratio: ((item.nbViewers / totalViewers) * 100).toFixed(2)
                }))
                commit('setCountriesBrute', countriesBrute)

                const filteredData = JSON.parse(event.data).filter((item) => item.country !== null)
                const values = filteredData.map((item) => [item.country, item.nbViewers])
                values.unshift(['Country', 'Popularity'])

                commit('setCountries', values)
            }
            eventSourceCountry.addEventListener('message', listener)
            eventSourceCountry.addEventListener('error', listener)
        } catch (error) {}
    },
    async getHeatmapPaths({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_HEATMAP_PATHS(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceHeatmap = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })
            const listener = async function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }

                const site = siteStore.state.site
                const heatmapPaths = JSON.parse(event.data).map((item) => ({
                    name: decodeURIComponent(decodeURIComponent(item.path.replace(site?.url, ''))),
                    id: encodeURIComponent(encodeURIComponent(item.path)) + '/lg'
                }))

                commit('setHeatmapPaths', heatmapPaths)
            }
            eventSourceHeatmap.addEventListener('message', listener)
            eventSourceHeatmap.addEventListener('error', listener)
        } catch (error) {}
    },
    async getHeatmap({ commit }, path, size = 'lg') {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_HEATMAP(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )
            const site = siteStore.state.site
            url.searchParams.append('path', decodeURIComponent(decodeURIComponent(path)))
            url.searchParams.append('size', size)

            eventSourceHeatmap = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })

            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }
                const heatmap = JSON.parse(event.data)
                commit('setHeatmap', heatmap)
            }
            eventSourceHeatmap.addEventListener('message', listener)
            eventSourceHeatmap.addEventListener('error', listener)
        } catch (error) {}
    },
    async getViewPerPages({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_VIEW_PER_PAGE(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceViewPerPages = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })

            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }

                console.log(JSON.parse(event.data))

                let eventBrute = JSON.parse(event.data)

                let { currentPeriod, dailyCounts } = eventBrute

                const trend = currentPeriod > previousPeriod ? 'up' : 'down'
                const differencePercentage =
                    ((totalSessionsCurrent - totalSessionsPrevious) / totalSessionsPrevious) * 100
                const description = trend === 'up' ? `more than last time` : `less than last time`
                const sessionsBrute = {
                    trend: trend,
                    value: totalSessionsCurrent,
                    lastPeriode: differencePercentage.toFixed(2),
                    description: differencePercentage.toFixed(2) + ' ' + description
                }
                commit('setViewPerPagesBrute', eventBrute)

                commit('setViewPerPages', eventBrute)
            }
            eventSourceViewPerPages.addEventListener('message', listener)
            eventSourceViewPerPages.addEventListener('error', listener)
        } catch (error) {}
    },
    async getTotalUser({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_TOTAL_USERS(router.currentRoute.value.params.site)
            )
            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceTotalUser = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })
            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }

                let eventBrute = JSON.parse(event.data)
                const { totalUsersCurrentPeriod, totalUsersPreviousPeriod } = eventBrute
                const trend = totalUsersCurrentPeriod > totalUsersPreviousPeriod ? 'up' : 'down'
                const description = trend === 'up' ? `more than last time` : `less than last time`
                const preview = {
                    trend: trend,
                    value: totalUsersCurrentPeriod,
                    description: description
                }

                const dayList = state.dayList
                let totalList = dayList.map((date) => {
                    const foundDay = eventBrute.dailyUsers.find((item) => item.date === date)
                    return foundDay ? parseInt(foundDay.usersCount) : 0
                })
                const labels = dayList.map((date) => date.replace(/^\d{4}-/, ''))
                const totalUsers = {
                    preview: preview,
                    chartData: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total Users',
                                data: totalList,
                                backgroundColor: '#a8dae3',
                                borderColor: '#a8dae3',
                                borderWidth: 6,
                                pointBorderWidth: 0
                            }
                        ]
                    }
                }

                commit('setTotalUser', totalUsers)
            }
            eventSourceTotalUser.addEventListener('message', listener)
            eventSourceTotalUser.addEventListener('error', listener)
        } catch (error) {}
    },
    async getNewUser({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_NEW_USERS(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceNewUser = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })
            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }
                let eventBrute = JSON.parse(event.data)
                const { newUsersCurrentPeriod, newUsersPreviousPeriod } = eventBrute
                const trend = newUsersCurrentPeriod > newUsersPreviousPeriod ? 'up' : 'down'
                const description = trend === 'up' ? `more than last time` : `less than last time`
                const preview = {
                    trend: trend,
                    value: newUsersCurrentPeriod,
                    description: description
                }

                const dayList = state.dayList
                let totalList = dayList.map((date) => {
                    const foundDay = eventBrute.dailyUsers.find((item) => item.date === date)
                    return foundDay ? parseInt(foundDay.usersCount) : 0
                })
                const labels = dayList.map((date) => date.replace(/^\d{4}-/, ''))
                const newUsers = {
                    preview: preview,
                    chartData: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'New Users',
                                data: totalList,
                                backgroundColor: '#a8dae3',
                                borderColor: '#a8dae3',
                                borderWidth: 6,
                                pointBorderWidth: 0
                            }
                        ]
                    }
                }

                commit('setNewUser', newUsers)
            }
            eventSourceNewUser.addEventListener('message', listener)
            eventSourceNewUser.addEventListener('error', listener)
        } catch (error) {}
    },
    async getActiveUsers({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_ACTIVE_USERS(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            eventSourceActiveUsers = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })
            const listener = function (event) {
                if (event.type === 'error') {
                    this.close()
                    return
                }
                console.log('event.data', event.data)

                //commit('setActiveUsers', JSON.parse(event.data))
            }
            eventSourceActiveUsers.addEventListener('message', listener)
            eventSourceActiveUsers.addEventListener('error', listener)
        } catch (error) {}
    }
}

const mutations = {
    setViewPerPages(state, viewPerPages) {
        state.viewPerPages = viewPerPages
    },
    setViewPerPagesBrute(state, viewPerPagesBrute) {
        state.viewPerPagesBrute = viewPerPagesBrute
    },
    setSessions(state, sessions) {
        state.sessions = sessions
    },
    setSessionsBrute(state, sessionsBrute) {
        state.sessionsBrute = sessionsBrute
    },
    setSessionsDuration(state, sessionsDuration) {
        state.sessionsDuration = sessionsDuration
    },
    setSessionsDurationBrute(state, sessionsDurationBrute) {
        state.sessionsDurationBrute = sessionsDurationBrute
    },
    setSessionBrute(state, sessionBrute) {
        state.sessionBrute = sessionBrute
    },
    setActiveUsers(state, activeUsers) {
        state.activeUsers = activeUsers
    },
    setDevices(state, devices) {
        state.devices = devices
    },
    setDevicesBrute(state, devicesBrute) {
        state.devicesBrute = devicesBrute
    },
    setCountries(state, countries) {
        state.countries = countries
    },
    setCountriesBrute(state, countriesBrute) {
        state.countriesBrute = countriesBrute
    },
    setRangeDate(state, rangeDate) {
        state.rangeDate = rangeDate

        const dayListVal = []
        const currentDate = new Date(rangeDate.startDate)
        const endDate = new Date(rangeDate.endDate)
        while (currentDate <= endDate) {
            const formattedDate = currentDate.toISOString().slice(0, 10)
            dayListVal.push(formattedDate)
            currentDate.setDate(currentDate.getDate() + 1)
        }

        state.dayList = dayListVal
    },
    setHeatmap(state, heatmap) {
        state.heatmap = heatmap
    },
    setHeatmapPaths(state, heatmapPaths) {
        state.heatmapPaths = heatmapPaths
    },
    setTotalUser(state, totalUser) {
        state.totalUser = totalUser
    },
    setNewUser(state, newUser) {
        state.newUser = newUser
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
