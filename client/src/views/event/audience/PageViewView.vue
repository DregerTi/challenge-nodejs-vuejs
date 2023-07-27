<script setup>
import { computed, defineEmits, onBeforeMount, onMounted, watch } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

let labels = ['page', 'views']

const store = useStore()
const viewPerPages = computed(() => store.state.eventStore.viewPerPages)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getViewPerPages')
})

watch(rangeDate, () => {
    store.dispatch('closeEventSourceViewPerPages')
    store.dispatch('getViewPerPages')
})

onBeforeMount(() => {
    store.dispatch('closeEventSourceViewPerPages')
})
</script>

<template>
    {{ viewPerPages }}
    <EventStat title="Page ranking" :rows="viewPerPages" :labels="labels"> </EventStat>
</template>

<style lang="scss"></style>
