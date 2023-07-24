<script setup>
import { computed, defineEmits, onBeforeMount } from 'vue'
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

const deleteTag = async (id) => {
    await store.dispatch('deleteTag', id)
}

onBeforeMount(async () => {
    await store.dispatch('getTag')
})
</script>

<template>
    <div class="event-form">
        <p>
            Are you sure you want to delete this tag - <b>{{ tag?.name }}</b
            >?
        </p>
        <div class="flex gap-4">
            <RouterLink
                class="w-full"
                :to="{
                    name: 'tag',
                    params: { site: $route.params.site, id: tag?.id }
                }"
            >
                <Button title="Cancel" class="w-full" variant="light-grey" />
            </RouterLink>
            <Button title="Delete" class="w-full" variant="error" @click="deleteTag(tag?.id)" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
