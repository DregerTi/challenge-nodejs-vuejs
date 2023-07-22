<script setup>
import { onMounted, provide, ref } from 'vue'
import * as siteService from '../services/siteService'
import router from '../router'
import { createSiteKey, refreshApiKeyKey, siteKey, sitesKey } from '@/contexts/SiteProviderKeys'
import { errorsKey } from '@/contexts/AuthProviderKeys'

const site = ref(null)
const sites = ref(null)
const errors = ref({})

onMounted(async () => {
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
        const response = await siteService.getSite(router.currentRoute.value.params.site)
        site.value = response
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

async function refreshApiKey(id) {
    try {
        await siteService.refreshApiKey(id)
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
</script>

<template>
    <slot v-bind="{ site, errors, createSite, refreshApiKey, sitesKey, sites }"></slot>
</template>
