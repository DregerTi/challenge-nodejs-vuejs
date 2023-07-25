import * as tokenStorage from '@/services/tokenStorage'
import { EventSourcePolyfill } from 'event-source-polyfill'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

async function requester(route, method, body, auth = true, eventSource = false) {
    if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return false
    const url = new URL(apiBaseUrl + route)

    if (method === 'GET' && body) {
        Object.keys(body).forEach((key) => url.searchParams.append(key, body[key]))
    }

    const headers = {
        Authorization: !auth ? null : `Bearer ${await tokenStorage.getToken()}`
    }

    if (eventSource) {
        const eventSource = new EventSourcePolyfill(url, {
            headers: {
                ...headers
            }
        })
        return eventSource
    } else {
        const response = await fetch(url, {
            headers: {
                ...headers,
                Accept: 'application/json',
                'Content-Type': 'application/json'
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

        return response
    }
}

export default requester
