export const getUser = async function getUser() {
    console.log('getUser')
    const token = await getToken()
    if (!token) {
        return null
    }
    return JSON.parse(atob(token).split('.')[1])
}

export const saveToken = async function saveToken(token) {
    localStorage.setItem('token', token)
}

export const getToken = async function getToken() {
    return localStorage.getItem('token')
}

export const removeToken = async function removeToken() {
    localStorage.removeItem('token')
}
