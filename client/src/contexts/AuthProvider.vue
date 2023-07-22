<script setup>
import { provide, onMounted, ref } from 'vue'
import { userKey, loginKey, logoutKey, registerKey, errorsKey } from './AuthProviderKeys'
import * as securityService from '../services/securityService'
import * as tokenStorage from '../services/tokenStorage'
import router from '../router'

const user = ref(null)
const errors = ref({})

async function login(email, password) {
    try {
        const response = await securityService.login(email, password)
        errors.value = {}
        await tokenStorage.saveToken(response.token)
        user.value = tokenStorage.getUser()
        await router.push({ name: 'dashboard' })
    } catch (error) {
        errors.value = error
    }
}

async function register(_user) {
    try {
        await securityService.register(_user)
        errors.value = {}
        await router.push({ name: 'login' })
    } catch (error) {
        errors.value = error
    }
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
provide(errorsKey, errors)
provide(loginKey, login)
provide(registerKey, register)
provide(logoutKey, logout)
</script>

<template>
    <slot v-bind="{ user, login, logout, errors, register }"></slot>
</template>
