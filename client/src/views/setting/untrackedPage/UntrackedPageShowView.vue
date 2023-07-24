<script setup>
import { defineEmits, computed, onUpdated } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const untrackedPage = computed(() => store.state.untrackedPage.untrackedPage)

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
</script>

<template>
    <h2>{{ untrackedPage?.url }}</h2>
</template>

<style scoped lang="scss"></style>
