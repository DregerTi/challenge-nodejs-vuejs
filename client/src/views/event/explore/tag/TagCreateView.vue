<script setup>
import { computed, defineEmits, reactive } from 'vue'
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
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', false)
emit('update:descriptionHidden', false)

const store = useStore()
const tagsErrors = computed(() => store.state.tag.tagsErrors)

const createTag = async (formData) => {
    await store.dispatch('createTag', formData)
}

const formData = reactive({
    name: ''
})
</script>

<template>
    <form class="event-form" @submit.prevent="createTag(formData)">
        <Input
            :error="tagsErrors.name"
            label="Title for this new tag"
            type="text"
            placeholder="Tag name"
            name="name"
            v-model:value="formData.name"
        />
        <Button title="Create" type="submit" />
    </form>
</template>

<style scoped lang="scss"></style>
