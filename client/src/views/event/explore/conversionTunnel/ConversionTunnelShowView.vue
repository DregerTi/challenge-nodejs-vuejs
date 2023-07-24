<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex'

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
emit('update:calendarBtn', true)
emit('update:descriptionHidden', false)

const store = useStore()
const conversionTunnel = computed(() => store.state.conversionTunnel.conversionTunnel)
</script>

<template>
    <h2>
        {{ conversionTunnel?.name }}
    </h2>
</template>

<style scoped lang="scss"></style>
