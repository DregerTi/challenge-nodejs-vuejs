<script setup>
import { computed, defineEmits, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

const store = useStore()
const sessions = computed(() => store.state.eventStore.sessions)

onBeforeMount(() => {
    store.dispatch('getSessions')
})

onMounted(() => {
    const inputElement = document.querySelector('.date-picoeur')
    if (inputElement) {
        inputElement.addEventListener('change', () => {
            store.dispatch('getSessions')
        })
    }
})
</script>

<template>
    <EventStat title="Sessions">
        <Bar id="my-chart-id" :data="sessions" />
    </EventStat>
</template>

<style lang="scss"></style>
