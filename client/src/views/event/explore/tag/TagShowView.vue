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
    store.dispatch('getTagEvent')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceTagEvent')
    store.dispatch('getTagEvent')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceTagEvent')
})
</script>

<template>
    <div class="mt-5">
        <h2 class="mb-3">
            {{ tag?.name }}
        </h2>
        <p>{{ tag?.tagKey }}</p>
    </div>
    <section v-if="tagEvent">
        total events: {{tagEvent?.currentPeriod?.currentPeriodCount }}
    </section>
</template>

<style scoped lang="scss"></style>
