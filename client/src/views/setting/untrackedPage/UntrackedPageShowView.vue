<script setup>
import { defineEmits, onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { getUntrackedPage } from '@/services/untrackedPageService'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore'
])
emit('update:deleteBtn', true)
emit('update:updateBtn', true)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', false)
emit('update:descriptionHidden', false)

const untrackedPage = ref(null)
onMounted(async () => {
    untrackedPage.value = await getUntrackedPage()
})
</script>

<template>
    <p>
        {{ untrackedPage?.url }}
    </p>
</template>

<style scoped lang="scss"></style>
