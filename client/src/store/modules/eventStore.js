import { EventSourcePolyfill } from 'event-source-polyfill'
import * as tokenStorage from '@/services/tokenStorage'
import ROUTES from '@/router/routes'
import router from '@/router'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const state = {
    viewPerPages: null,
    viewPerPagesBrute: null,
    sessionsBrute: null,
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
    countries: {},
    countriesBrute: null,
    activeUsers: null,
    rangeDate: [],
    dayList: null
}

const getters = {
    viewPerPages: (state) => state.viewPerPages,
    rangeDate: (state) => state.rangeDate,
    sessions: (state) => state.sessions,
    sessionsDuration: (state) => state.sessionsDuration,
    activeUsers: (state) => state.activeUsers
}

let eventSourceSession = null
let eventSourceDevice = null
let eventSourceCountry = null

const actions = {
    async getViewPerPages({ commit }) {},
    async closeEventSourceSession() {
        await eventSourceSession.close()
        eventSourceSession = null
    },
    async closeEventSourceDevice() {
        await eventSourceDevice.close()
        eventSourceDevice = null
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
                    description: differencePercentage.toFixed(2) + ' ' + description
                }

                commit('setSessionsBrute', sessionsBrute)

                const dayList = state.dayList
                const totalList = dayList.map((date) => {
                    const foundDay = JSON.parse(event.data).dailySessions.find(
                        (item) => item.date === date
                    )
                    return foundDay ? parseInt(foundDay.totalSessions) : 0
                })

                const chartData = {
                    labels: dayList,
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
                commit('setSessionsDurationBrute', JSON.parse(event.data))
                const dayList = state.dayList
                const totalList = dayList.map((date) => {
                    const foundDay = JSON.parse(event.data).dailySessions.find(
                        (item) => item.date === date
                    )
                    return foundDay ? parseInt(foundDay.totalSessions) : 0
                })

                const chartData = {
                    labels: dayList,
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
                    title: item.system,
                    value: item.nbViewers,
                    ratio: ((item.nbViewers / totalViewers) * 100).toFixed(2)
                }))
                commit('setCountriesBrute', countriesBrute)

                const countryList = JSON.parse(event.data)
                const labels = countryList.map((item) => item.country)
                const data = countryList.map((item) => item.nbViewers)

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

                commit('setCountries', chartData)
            }
            //eventSourceCountry.addEventListener('open', listener)
            eventSourceCountry.addEventListener('message', listener)
            eventSourceCountry.addEventListener('error', listener)
        } catch (error) {}
    },
    async getActiveUsers({ commit }) {}
}

const mutations = {
    setViewPerPages(state, viewPerPages) {
        state.viewPerPages = viewPerPages
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
