<script setup>
import { defineEmits, onMounted, onUpdated, ref } from 'vue'
import Button from '@/components/atoms/Button.vue'
import { getUntrackedPage } from '@/services/untrackedPageService'
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
emit('update:calendarBtn', false)
emit('update:mdMenuExplore', true)
emit('update:descriptionHidden', false)

const untrackedPage = ref(null)
onMounted(async () => {
    untrackedPage.value = await getUntrackedPage()
})
</script>

<template>
    <div class="event-form">
        <UntrackedPageProvider #default="{ deleteUntrackedPage, errors }">
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
                    title="Delete"
                    class="w-full"
                    variant="error"
                    :onClick="deleteUntrackedPage(untrackedPage?.id)"
                />
            </div>
        </UntrackedPageProvider>
    </div>
</template>

<style scoped lang="scss"></style>
