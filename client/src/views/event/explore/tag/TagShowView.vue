<script setup>
import { computed, defineEmits, onMounted, onUnmounted, watch } from 'vue'
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
const tagEvent = computed(() => store.state.eventStore.tag)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getTag')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceTag')
    store.dispatch('getTag')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceTag')
})
</script>

<template>
    <div class="mt-5">
        <h2 class="mb-3">
            {{ tag?.name }}
        </h2>
        <p>{{ tag?.tagKey }}</p>
    </div>
    <section>
        {{ tagEvent }}
    </section>
</template>

<style scoped lang="scss"></style>
