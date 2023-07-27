import ROUTES from '@/router/routes'
import requester from '@/util/requester'
import router from '@/router'

export const getMe = async function getMe() {
    try {
        const response = await requester(
            ROUTES.GET_ME(),
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