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

onMounted(() => {
    store.dispatch('getSessions')
})

onMounted(() => {
    setTimeout(() => {
        const inputElement = document.getElementsByClassName('date-picoeur')[0]
        if (inputElement) {
            inputElement[0].addEventListener('change', () => {
                console.log('change')
                store.dispatch('getSessions')
            })
        }
    }, 8)
})
</script>

<template>
    <EventStat title="Sessions">
        <Bar id="my-chart-id" :data="sessions" />
    </EventStat>
</template>

<style lang="scss"></style>
