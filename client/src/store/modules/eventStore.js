import * as eventService from '@/services/eventService'
import { getViewPerPage } from '@/services/eventService'
import { EventSourcePolyfill } from 'event-source-polyfill'
import * as tokenStorage from '@/services/tokenStorage'
import ROUTES from '@/router/routes'
import router from '@/router'
import { computed } from 'vue'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const state = {
    viewPerPages: null,
    sessions: {
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    },
    sessionsDuration: null,
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

const actions = {
    async getViewPerPages({ commit }) {},
    async getSessions({ commit }) {
        try {
            const url = new URL(
                apiBaseUrl + ROUTES.EVENT_SESSION(router.currentRoute.value.params.site)
            )

            Object.keys(state.rangeDate).forEach((key) =>
                url.searchParams.append(key, state.rangeDate[key])
            )

            const eventSourceSession = new EventSourcePolyfill(url, {
                headers: {
                    Authorization: `Bearer ${await tokenStorage.getToken()}`
                }
            })

            const listener = function (event) {
                if (event.type === 'error') {
                    this.close();
                    return;
                }
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
    async getActiveUsers({ commit }) {}
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
