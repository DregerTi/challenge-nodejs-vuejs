import * as tokenStorage from '@/services/tokenStorage'
import router from '@/router'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

async function requester(route, method, body, auth = true) {
    if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return false
    const url = new URL(apiBaseUrl + route)

    if (method === 'GET' && body) {
        Object.keys(body).forEach((key) => url.searchParams.append(key, body[key]))
    }

    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: !auth ? null : `Bearer ${await tokenStorage.getToken()}`
        },
        method,
        body: body == null || method === 'GET' ? null : JSON.stringify(body)
    })

    if (response.status === 401) {
        if ((await tokenStorage.getToken()) !== null) {
            await tokenStorage.removeToken()
            window.location.reload()
        }
    }

    /*if (response.status === 404 || response.status === 500 || response.status === 403) {
        await router.push({ name: 'error' })
    }*/

    return response
}

export default requester
