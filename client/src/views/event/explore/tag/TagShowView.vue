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
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:mdMenuExplore', false)
emit('update:calendarBtn', false)
emit('update:descriptionHidden', false)

const store = useStore()
const tag = computed(() => store.state.tag.tag)
</script>

<template>
    <div class="mt-5">
        <h2 class="mb-3">
            {{ tag?.name }}
        </h2>
        <p>{{ tag?.tagKey }}</p>
    </div>
</template>

<style scoped lang="scss"></style>
