<script setup>
import { provide, onMounted, ref } from 'vue'
import { userKey, loginKey, logoutKey } from './AuthProviderKeys'
import * as securityService from '../services/securityService'
import * as tokenStorage from '../services/tokenStorage'

const user = ref(null)

async function login({ email, password }) {
    const token = await securityService.login(email, password)

    await tokenStorage.saveToken(token)
    user.value = await tokenStorage.getUser()
}

async function logout() {
    await tokenStorage.removeToken()
    user.value = null
}

onMounted(() => {
    if (user == !null) {
        tokenStorage.getUser().then((user) => {
            user.value = user
        })
    }
})

provide(userKey, user)
provide(loginKey, login)
provide(logoutKey, logout)
</script>

<template>
    <slot v-bind="{ user, login, logout }"></slot>
</template>
