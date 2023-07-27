<script setup>
import { provide, onMounted, ref, computed } from 'vue'
import {
    userKey,
    loginKey,
    logoutKey,
    registerKey,
    errorsKey,
    getUserKey
} from './AuthProviderKeys'
import * as securityService from '../services/securityService'
import * as tokenStorage from '../services/tokenStorage'
import router from '../router'
import { useStore } from 'vuex'

const user = ref(null)
const errors = ref({})
const store = useStore()
const sites = computed(() => store.state.siteStore.sites)

async function login(email, password) {
    try {
        const response = await securityService.login(email, password)
        errors.value = {}
        await tokenStorage.saveToken(response.token)
        //user.value = tokenStorage.getUser()
        await store.dispatch('getSites')
        if (sites.value.length > 0) {
            console.log('jjkjlkjkk')
            router.push({ name: 'dashboard', params: { site: sites.value[0].id } })
        } else {
            router.push({ name: 'site-create' })
        }
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

provide(userKey, user)
provide(errorsKey, errors)
provide(loginKey, login)
provide(registerKey, register)
provide(logoutKey, logout)
</script>

<template>
    <slot v-bind="{ user, login, logout, errors, register }"></slot>
</template>
