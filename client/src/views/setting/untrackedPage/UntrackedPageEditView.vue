<script setup>
import { computed, defineEmits, onBeforeMount, reactive } from 'vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import { useStore } from 'vuex'

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

const store = useStore()
const untrackedPage = computed(() => store.state.untrackedPage.untrackedPage)
const errors = computed(() => store.state.untrackedPage.errors)

const updateUntrackedPage = async (formData) => {
    await store.dispatch('updateUntrackedPage', formData)
}

let formData = reactive({})
onBeforeMount(async () => {
    await store.dispatch('getUntrackedPage')
    formData.url = untrackedPage.value.url
    formData.id = untrackedPage.value.id
})
</script>

<template>
    <div>
        <form class="event-form" @submit.prevent="updateUntrackedPage(formData)">
            <Input
                :error="errors?.url"
                label="URL of the page you want to exclude"
                type="text"
                placeholder="https://example.com/checkout"
                name="url"
                v-model:value="formData.url"
            />
            <Button type="submit" title="Update" />
        </form>
    </div>
</template>

<style scoped lang="scss"></style>
