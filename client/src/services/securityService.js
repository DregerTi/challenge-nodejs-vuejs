import ROUTES from '@/router/routes'
import requester from '@/util/requester'

export const login = async function login(email, password) {
    try {
        const response = await requester(
            ROUTES.LOGIN(),
            'POST',
            {
                email,
                password
            },
            false
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const register = async function register(_user) {
    try {
        const response = await requester(
            ROUTES.REGISTER(),
            'POST',
            {
                ..._user
            },
            false
        )

        if (response.status === 422) {
            throw await response.json()
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}
