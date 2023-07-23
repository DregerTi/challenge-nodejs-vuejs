import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'

export const createUntrackedPage = async function createUntrackedPage(_untrackedPage) {
    try {
        const response = await requester(
            ROUTES.UNTRACKED_PATH(router.currentRoute.value.params.site),
            'POST',
            {
                ..._untrackedPage
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

export const getUntrackedPages = async function getUntrackedPages() {
    try {
        const response = await requester(
            ROUTES.UNTRACKED_PATH(router.currentRoute.value.params.site),
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

export const updateUntrackedPage = async function updateUntrackedPage(_untrackedPage) {
    try {
        const response = await requester(
            ROUTES.UNTRACKED_PATH(router.currentRoute.value.params.site, _untrackedPage.id),
            'PATCH',
            {
                ..._untrackedPage
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

export const deleteUntrackedPage = async function deleteUntrackedPage(id) {
    try {
        const response = await requester(
            ROUTES.UNTRACKED_PATH(router.currentRoute.value.params.site, id),
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

export const getUntrackedPage = async function getUntrackedPage() {
    try {
        const response = await requester(
            ROUTES.UNTRACKED_PATH(
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
