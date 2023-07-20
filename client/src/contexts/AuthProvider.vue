<script setup>
import { provide, onMounted, ref } from 'vue'
import { userKey, loginKey, logoutKey, registerKey, errorsKey } from './AuthProviderKeys'
import * as securityService from '../services/securityService'
import * as tokenStorage from '../services/tokenStorage'
import { useRouter } from 'vue-router'

const user = ref(null)
const errors = ref({})

async function login(email, password) {
    try {
        const token = await securityService.login(email, password)
        errors.value = {}
        await tokenStorage.saveToken(token)
        user.value = await tokenStorage.getUser()
        useRouter().push({ name: 'analytics' })
    } catch (error) {
        errors.value = error
    }
}

async function register(_user) {
    try {
        await securityService.register(_user)
        errors.value = {}
        useRouter().push({ name: 'login' })
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
