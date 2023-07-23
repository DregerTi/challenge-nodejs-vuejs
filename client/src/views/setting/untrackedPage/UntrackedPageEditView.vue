<script setup>
import { defineEmits, onBeforeMount, onMounted, reactive, ref } from 'vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import UntrackedPageProvider from '@/contexts/UntrackedPageProvider.vue'
import { getUntrackedPage } from '@/services/untrackedPageService'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore'
])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:calendarBtn', false)
emit('update:mdMenuExplore', true)
emit('update:descriptionHidden', false)

let formData = reactive({})
const untrackedPage = ref(null)
onBeforeMount(async () => {
    untrackedPage.value = await getUntrackedPage()
    formData = await untrackedPage.value
})
</script>

<template>
    <div>
        <UntrackedPageProvider #default="{ untrackedPage, errors, updateUntrackedPage }">
            <form class="event-form" @submit.prevent="updateUntrackedPage(formData)">
                <Input
                    :error="errors.url"
                    label="URL of the page you want to exclude"
                    type="text"
                    placeholder="https://example.com/checkout"
                    name="url"
                    v-model:value="formData.url"
                />
                <Button type="submit" title="Update" />
            </form>
        </UntrackedPageProvider>
    </div>
</template>

<style scoped lang="scss"></style>
