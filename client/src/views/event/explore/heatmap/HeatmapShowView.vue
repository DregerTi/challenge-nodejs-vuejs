<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore',
    'update:screenShotBtn'
])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', true)
emit('update:descriptionHidden', false)
emit('update:screenShotBtn', true)
</script>

<template>
    <div>oe</div>
</template>

<style scoped lang="scss"></style>
