import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'

export const createTag = async function createTag(_tag) {
    try {
        const response = await requester(
            ROUTES.TAG(router.currentRoute.value.params.site),
            'POST',
            {
                ..._tag
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

export const getTags = async function getTags() {
    try {
        const response = await requester(
            ROUTES.TAG(router.currentRoute.value.params.site),
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

export const updateTag = async function updateTag(_tag) {
    try {
        const response = await requester(
            ROUTES.TAG(router.currentRoute.value.params.site, _tag.id),
            'PATCH',
            {
                ..._tag
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

export const deleteTag = async function deleteTag(id) {
    try {
        const response = await requester(
            ROUTES.TAG(router.currentRoute.value.params.site, id),
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

export const getTag = async function getTag() {
    try {
        if (!router.currentRoute.value.params.site || !router.currentRoute.value.params.id) {
            throw new Error('Fetch failed')
        }
        const response = await requester(
            ROUTES.TAG(router.currentRoute.value.params.site, router.currentRoute.value.params.id),
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
