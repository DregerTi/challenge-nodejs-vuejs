<script setup>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import { computed, onBeforeMount, reactive } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const store = useStore()
const siteErrors = computed(() => store.state.siteStore.siteErrors)
const site = computed(() => store.state.siteStore.site)

const updateSite = async (formData) => {
    await store.dispatch('updateSite', formData)
}

const formData = reactive({})

onBeforeMount(async () => {
    await store.dispatch('getSite', router.currentRoute.value.params.site)
    formData.name = site.value.name
    formData.url = site.value.url
    formData.id = site.value.id
})
</script>

<template>
    <div>
        <header class="flex justify-between items-base">
            <h2>Web site informations</h2>
        </header>
        <form class="mt-12 mb-12 flex flex-col gap-4" @submit.prevent="updateSite(formData)">
            <Input
                :error="siteErrors?.name"
                class="w-full"
                label="Website name"
                type="text"
                placeholder="Website name"
                name="name"
                v-model:value="formData.name"
            />
            <Input
                :error="siteErrors?.url"
                class="w-full"
                label="Website URL"
                type="text"
                placeholder="https://website-url.com"
                name="url"
                v-model:value="formData.url"
            />
            <Button title="Save" type="submit" />
        </form>
    </div>
</template>

<style scoped lang="scss">
.info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2rem;
    > span {
        color: var(--color-text-secondary);
        font-size: 1.2rem !important;
        line-height: 1.2rem !important;
        font-weight: 500;
    }
    > p {
        color: var(--color-text);
        font-size: 1rem !important;
        line-height: 1rem !important;
        font-weight: 500;
    }
}
</style>
