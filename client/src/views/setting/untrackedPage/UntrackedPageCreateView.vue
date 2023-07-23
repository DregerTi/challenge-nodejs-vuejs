<script setup>
import { defineEmits, reactive } from 'vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import UntrackedPageProvider from '@/contexts/UntrackedPageProvider.vue'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore'
])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', false)
emit('update:descriptionHidden', false)

const formData = reactive({
    url: ''
})
</script>

<template>
    <div>
        <UntrackedPageProvider #default="{ createUntrackedPage, errors }">
            <form class="event-form" @submit.prevent="createUntrackedPage(formData)">
                <Input
                    :error="errors.url"
                    label="URL or Regex of the page you want to exclude"
                    type="text"
                    placeholder="https://example.com/checkout"
                    name="url"
                    v-model:value="formData.url"
                />
                <Button type="submit" title="Create" />
            </form>
        </UntrackedPageProvider>
    </div>
</template>

<style scoped lang="scss"></style>
