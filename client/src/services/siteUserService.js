import ROUTES from '@/router/routes'
import requester from '@/util/requester'

export const getSiteUsers = async function getSiteUsers(id, filters) {
    try {
        const response = await requester(
            ROUTES.SITE_USERS(id, filters),
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

export const updateSiteUser = async function updateSiteUser(siteId, userId, _role) {
    try {
        const response = await requester(
            ROUTES.SITE_USER(siteId, userId),
            'PATCH',
            {
                role: _role
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

export const getSiteUser = async function getSiteUser(siteId, userId) {
    try {
        const response = await requester(
            ROUTES.SITE_USER(siteId, userId),
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