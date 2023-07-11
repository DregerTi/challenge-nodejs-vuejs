<script setup>
import { defineEmits } from 'vue'
import Button from '@/components/atoms/Button.vue'

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
</script>

<template>
    <div class="event-form">
        <p>Are you sure you want to delete this conversion funnel?</p>
        <div class="flex gap-4">
            <RouterLink
                class="w-full"
                :to="
                    '/analytics/' +
                    $route.params.site +
                    '/explore/conversion-tunnel/' +
                    $route.params.id
                "
            >
                <Button title="Cancel" class="w-full" variant="light-grey" />
            </RouterLink>
            <Button title="Delete" class="w-full" variant="error" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
