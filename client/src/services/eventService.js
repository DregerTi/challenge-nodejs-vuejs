import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'

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
