import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'
import { computed } from 'vue'

export const getViewPerPage = async function getViewPerPage() {
    try {
        const response = await requester(
            ROUTES.EVENT_VIEW_PER_PAGE(router.currentRoute.value.params.site),
            'GET',
            {},
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getSessions = async function getSessions(_rangeDate) {
    try {
        const response = await requester(
            ROUTES.EVENT_SESSION(router.currentRoute.value.params.site),
            'GET',
            {
                ..._rangeDate
            },
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getSessionsDuration = async function getSessionsDuration() {
    try {
        const response = await requester(
            ROUTES.EVENT_SESSION_DURATION(router.currentRoute.value.params.site),
            'GET',
            {},
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getActiveUsers = async function getActiveUsers() {
    try {
        const response = await requester(
            ROUTES.EVENT_ACTIVE_USERS(router.currentRoute.value.params.site),
            'GET',
            {},
            true
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}
