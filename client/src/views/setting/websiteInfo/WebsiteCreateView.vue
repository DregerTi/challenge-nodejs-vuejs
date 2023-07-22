<script setup>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import SiteProvider from '@/contexts/SiteProvider.vue'
import { reactive } from 'vue'

const formData = reactive({
    name: '',
    url: ''
})
</script>

<template>
    <div>
        <SiteProvider #default="{ site, errors, createSite }">
            <header class="flex justify-between items-base">
                <h2>Add your web site</h2>
            </header>
            <form @submit.prevent="createSite(formData)" class="mt-12 mb-12 flex flex-col gap-4">
                <Input
                    :error="errors.name"
                    class="w-full"
                    label="Website name"
                    type="text"
                    placeholder="Website name"
                    name="name"
                    v-model:value="formData.name"
                />
                <Input
                    :error="errors.url"
                    class="w-full"
                    label="Website URL"
                    type="text"
                    placeholder="https://website-url.com"
                    name="url"
                    v-model:value="formData.url"
                />
                <Button type="submit" title="Submit" />
            </form>
        </SiteProvider>
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
