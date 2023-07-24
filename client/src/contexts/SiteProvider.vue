<script setup>
import { onMounted, provide, ref } from 'vue'
import * as siteService from '../services/siteService'
import router from '../router'
import {
    apiKeyKey,
    createSiteKey,
    refreshApiKeyKey,
    siteKey,
    sitesKey
} from '@/contexts/SiteProviderKeys'
import { errorsKey } from '@/contexts/AuthProviderKeys'

const site = ref(null)
const sites = ref(null)
const errors = ref({})
const apiKey = ref('************')

onMounted(async () => {
    if (router.currentRoute.value.name === 'site-create') {
        return
    }
    const sitees = await siteService.getUserSites()
    sites.value = sitees

    if (!router.currentRoute.value.params.site) {
        if (sitees[0]) {
            site.value = sitees[0]
            await router.push({ name: 'dashboard', params: { site: sitees[0].id } })
        } else {
            await router.push({ name: 'site-create' })
        }
    }

    try {
        site.value = await siteService.getSite(router.currentRoute.value.params.site)
    } catch (error) {
        await router.push({ name: 'site-create' })
    }
})

async function createSite(_site) {
    try {
        const response = await siteService.createSite(_site)
        site.value = response
        await router.push({ name: 'dashboard', params: { site: response.id } })
    } catch (error) {
        errors.value = error
    }
}

async function refreshApiKey() {
    try {
        const apiKeyResponse = await siteService.refreshApiKey(
            router.currentRoute.value.params.site
        )
        apiKey.value = apiKeyResponse.apiKey
        site.value.apiKey = apiKeyResponse.apiKey
        errors.value = {}
    } catch (error) {
        errors.value = error
    }
}

provide(siteKey, site)
provide(sitesKey, sites)
provide(errorsKey, errors)
provide(createSiteKey, createSite)
provide(refreshApiKeyKey, refreshApiKey)
provide(apiKeyKey, apiKey)
</script>

<template>
    <slot v-bind="{ site, errors, createSite, refreshApiKey, sitesKey, sites, apiKey }"></slot>
</template>
