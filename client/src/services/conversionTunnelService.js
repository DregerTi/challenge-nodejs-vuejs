import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'

export const createConversionTunnel = async function createConversionTunnel(_conversionTunnel) {
    try {
        const response = await requester(
            ROUTES.CONVERSION_TUNNEL(router.currentRoute.value.params.site),
            'POST',
            {
                ..._conversionTunnel
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

export const getConversionTunnels = async function getConversionTunnels() {
    try {
        const response = await requester(
            ROUTES.CONVERSION_TUNNEL(router.currentRoute.value.params.site),
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

export const updateConversionTunnel = async function updateConversionTunnel(_conversionTunnel) {
    try {
        const response = await requester(
            ROUTES.CONVERSION_TUNNEL(router.currentRoute.value.params.site, _conversionTunnel.id),
            'PATCH',
            {
                ..._conversionTunnel
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

export const deleteConversionTunnel = async function deleteConversionTunnel(id) {
    try {
        const response = await requester(
            ROUTES.CONVERSION_TUNNEL(router.currentRoute.value.params.site, id),
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

export const getConversionTunnel = async function getConversionTunnel() {
    try {
        if (!router.currentRoute.value.params.site || !router.currentRoute.value.params.id) {
            throw new Error('Fetch failed')
        }
        const response = await requester(
            ROUTES.CONVERSION_TUNNEL(
                router.currentRoute.value.params.site,
                router.currentRoute.value.params.id
            ),
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
