<script setup>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import SiteProvider from '@/contexts/SiteProvider.vue'
import { EventSourcePolyfill } from 'event-source-polyfill'
import * as tokenStorage from '@/services/tokenStorage'
import { useStore } from 'vuex'
import { computed, onBeforeMount } from 'vue'
import MenuButton from '@/components/molecules/MenuButton.vue'

const store = useStore()
const site = computed(() => store.state.siteStore.site)
const siteErrors = computed(() => store.state.siteStore.siteErrors)

const refreshApiKey = async () => {
    await store.dispatch('refreshApiKey')
}

onBeforeMount(async () => {
    await store.dispatch('getSite')
})
</script>

<template>
    <div>
        <h2>Web site API key</h2>
        <div class="mt-12 mb-12 flex gap-4 items-end">
            <Input
                class="grow"
                label="API key"
                type="text"
                placeholder="API key"
                name="name"
                :value="site?.apiKey"
            />
            <Button
                icon="Autorenew"
                class="h-fit mb-2.5"
                @click="refreshApiKey"
            />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
