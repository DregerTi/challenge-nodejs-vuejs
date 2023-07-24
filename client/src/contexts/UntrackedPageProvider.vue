<script setup>
import { nextTick, onMounted, onUpdated, provide, ref } from 'vue'
import router from '../router'
import {
    untrackedPageKey,
    untrackedPagesKey,
    errorsKey,
    createUntrackedPageKey,
    updateUntrackedPageKey,
    deleteUntrackedPageKey,
    getUntrackedPageKey,
    getUntrackedPagesKey
} from '@/contexts/UntrackedPageProviderKeys'
import * as untrackedPageService from '@/services/untrackedPageService'

const untrackedPages = ref(null)
const untrackedPage = ref(null)
const errors = ref({})

onMounted(async () => {
    untrackedPages.value = await untrackedPageService.getUntrackedPages()
    untrackedPage.value = await untrackedPageService.getUntrackedPage()
})

async function createUntrackedPage(_untrackedPage) {
    try {
        const response = await untrackedPageService.createUntrackedPage(_untrackedPage)
        const responseUntrackedPages = await untrackedPageService.getUntrackedPages()
        untrackedPages.value = responseUntrackedPages
        untrackedPage.value = response
        await router.push({
            name: 'untracked-page-show',
            params: { site: router.currentRoute.value.params.site, id: untrackedPage.value.id }
        })
    } catch (error) {
        errors.value = error
    }
}

async function updateUntrackedPage(_untrackedPage) {
    try {
        const response = await untrackedPageService.updateUntrackedPage(_untrackedPage)
        untrackedPage.value = response
        await router.push({
            name: 'untracked-page-show',
            params: { site: router.currentRoute.value.params.site, id: untrackedPage.value.id }
        })
    } catch (error) {
        errors.value = error
    }
}

async function deleteUntrackedPage(id) {
    try {
        await untrackedPageService.deleteUntrackedPage(id)
        untrackedPage.value = null
        await router.push({
            name: 'untracked-page',
            params: { site: router.currentRoute.value.params.site }
        })
    } catch (error) {
        errors.value = error
    }
}

async function getUntrackedPages() {
    try {
        const untrackedPagesResponse = await untrackedPageService.getUntrackedPages()
        untrackedPages.value = untrackedPagesResponse
        errors.value = {}
    } catch (error) {
        errors.value = error
    }
}

async function getUntrackedPage() {
    try {
        const untrackedPageResponse = await untrackedPageService.getUntrackedPage()
        untrackedPage.value = untrackedPageResponse
        console.log(untrackedPage.value)
        //return untrackedPage.value
        errors.value = {}
    } catch (error) {
        errors.value = error
    }
}

provide(untrackedPagesKey, untrackedPages)
provide(untrackedPageKey, untrackedPage)
provide(errorsKey, errors)
provide(createUntrackedPageKey, createUntrackedPage)
provide(updateUntrackedPageKey, updateUntrackedPage)
provide(deleteUntrackedPageKey, deleteUntrackedPage)
provide(getUntrackedPageKey, getUntrackedPage)
provide(getUntrackedPagesKey, getUntrackedPages)
</script>

<template>
    <slot
        v-bind="{
            untrackedPages,
            untrackedPage,
            errors,
            createUntrackedPage,
            updateUntrackedPage,
            deleteUntrackedPage
        }"
    ></slot>
</template>
