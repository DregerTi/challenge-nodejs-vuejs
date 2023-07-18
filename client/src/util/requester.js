import * as tokenStorage from '@/services/tokenStorage'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

function requester(route, method, body, auth = true) {
    if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return false

    return fetch(apiBaseUrl + route, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: !auth ? null : `Bearer ${tokenStorage.getToken()}`
        },
        method,
        body: body == null ? null : JSON.stringify(body)
    })
}

export default requester
