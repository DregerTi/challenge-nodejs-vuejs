import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'

export async function updateSite(_site) {
    try {
        const response = await requester(
            ROUTES.SITE(_site.id),
            'PATCH',
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

export const getSiteUsers = async function getSiteUsers() {
    try {
        const response = await requester(
            ROUTES.SITE_USERS(router.currentRoute.value.params.site),
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

export const getSiteUser = async function getSiteUser(id) {
    try {
        const response = await requester(
            ROUTES.SITE_USERS(router.currentRoute.value.params.site) + '/' + id,
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

export const getSites = async function getSites() {
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

export const updateSiteUser = async function updateSiteUser(data) {
    try {
        const response = await requester(
            ROUTES.SITE_USERS(router.currentRoute.value.params.site) + '/' + data.email,
            'PATCH',
            {
                role: data.permissions
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

export const deleteSiteUser = async function deleteSiteUser(email) {
    try {
        const response = await requester(
            ROUTES.SITE_USERS(router.currentRoute.value.params.site) + '/' + email,
            'DELETE',
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

export const getRole = async function getRole() {
    try {
        const response = await requester(ROUTES.GET_ME(), 'GET', {}, true)

        if (response.status === 422) {
            throw await response.json()
        }

        const user = await response.json()

        return user.SiteUsers
    } catch (error) {
        throw error
    }
}
