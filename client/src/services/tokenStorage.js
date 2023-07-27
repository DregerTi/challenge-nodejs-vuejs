export const getUser = async function getUser() {
    const token = await getToken()
    if (!token) {
        return null
    }
    console.log(token)
    console.log(atob(token).split('.')[1])

    return atob(token).split('.')[1]
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
