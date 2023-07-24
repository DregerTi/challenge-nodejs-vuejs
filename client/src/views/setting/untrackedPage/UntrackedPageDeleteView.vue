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
const untrackedPage = computed(() => store.state.untrackedPage.untrackedPage)

const deleteUntrackedPage = async (id) => {
    await store.dispatch('deleteUntrackedPage', id)
}

onBeforeMount(async () => {
    await store.dispatch('getUntrackedPage')
})
</script>

<template>
    <div class="event-form">
        <p>
            Are you sure you want to delete this untracked page - <b>{{ untrackedPage?.url }}</b
            >?
        </p>
        <div class="flex gap-4">
            <RouterLink
                class="w-full"
                :to="{
                    name: 'untracked-page',
                    params: { site: $route.params.site, id: untrackedPage?.id }
                }"
            >
                <Button title="Cancel" class="w-full" variant="light-grey" />
            </RouterLink>
            <Button
                :key="untrackedPage?.id"
                title="Delete"
                class="w-full"
                variant="error"
                @click="deleteUntrackedPage(untrackedPage?.id)"
            />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
