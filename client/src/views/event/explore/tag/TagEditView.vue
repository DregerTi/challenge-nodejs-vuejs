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
const tag = computed(() => store.state.tag.tag)
const tagsErrors = computed(() => store.state.tag.tagsErrors)

const updateTag = async (formData) => {
    await store.dispatch('updateTag', formData)
}

let formData = reactive({})
onBeforeMount(async () => {
    await store.dispatch('getTag')
    formData.name = tag.value.name
    formData.id = tag.value.id
})
</script>

<template>
    <form class="event-form" @submit.prevent="updateTag(formData)">
        <Input
            :error="tagsErrors?.name"
            label="New title for this tag"
            type="text"
            placeholder="Tag name"
            name="name"
            v-model:value="formData.name"
        />
        <Button type="submit" title="Update" />
    </form>
</template>

<style scoped lang="scss"></style>
