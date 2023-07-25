<script setup>
import { computed, defineEmits, onBeforeMount, onUnmounted, ref } from 'vue'
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

const range = ['2023-07-19', '2023-07-25']
const startDate = new Date(range[0])
const endDate = new Date(range[1])

const store = useStore()
const sessions = computed(() => store.state.eventStore.sessions)

onBeforeMount(() => {
    store.dispatch('getSessions')
})
</script>

<template>
    <EventStat title="Sessions">
        <Bar id="my-chart-id" :data="sessions" />
    </EventStat>
</template>

<style lang="scss"></style>
