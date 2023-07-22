import * as tokenStorage from '@/services/tokenStorage'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

async function requester(route, method, body, auth = true) {
    if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return false
    const url = new URL(apiBaseUrl + route)
    if (body && method === 'GET') {
        //Object.keys(body).forEach((key) => url.searchParams.append(key, body[key]))

        url.pathname += '/' + Object.values(body).join('/')
    }

    return fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: !auth ? null : `Bearer ${await tokenStorage.getToken()}`
        },
        method,
        body: body == null || method === 'GET' ? null : JSON.stringify(body)
    })
}

export default requester
