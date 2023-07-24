import ROUTES from '@/router/routes'
import requester from '@/util/requester'

export const createSite = async function createSite(_site) {
    try {
        const response = await requester(
            ROUTES.SITE(),
            'POST',
            {
                ..._site
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

export const refreshApiKey = async function refreshApiKey(id) {
    try {
        const response = await requester(ROUTES.RENEW_API_KEY(id), 'GET', {}, true)

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getUserSites = async function getUserSites() {
    try {
        const response = await requester(ROUTES.USER_SITE(), 'GET', {}, true)

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getSite = async function getSite(id) {
    try {
        const response = await requester(ROUTES.SITE(id), 'GET', {}, true)

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}
