<script setup>
import { computed, defineEmits, onBeforeMount, ref } from 'vue'
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

let labels = ['page', 'views']
let rows = [
    {
        title: 'Home',
        value: '3255',
        trend: 'up',
        ratio: '23'
    },
    {
        title: 'dsk 1',
        value: '32898',
        trend: 'down',
        ratio: '23'
    },
    {
        title: 'df dffdf d',
        value: '322',
        trend: 'down',
        ratio: '23'
    },
    {
        title: 'df dfdfdgh d',
        value: '32',
        trend: 'up',
        ratio: '2'
    },
    {
        title: 'sdf fddf dffd',
        value: '32',
        trend: 'up',
        ratio: '33'
    },
    {
        title: 'fsd',
        value: '3',
        trend: 'down',
        ratio: '23'
    },
    {
        title: 'sdfdsf',
        value: '2',
        trend: 'same',
        ratio: '21'
    },
    {
        title: 'sd ges d',
        value: '1',
        trend: 'up',
        ratio: '3'
    }
]

const range = ['2023-07-19', '2023-07-25']
const startDate = new Date(range[0])
const endDate = new Date(range[1])

const store = useStore()
const sessions = computed(() => store.state.eventStore.sessions)
const rangeDate = computed(() => store.state.eventStore.rangeDate)
const chartData = ref({
    labels: [],
    datasets: [
        {
            data: []
        }
    ]
})

onBeforeMount(async () => {
    await store.dispatch('getSessions', rangeDate.value)

    const dayList = []

    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().slice(0, 10)
        dayList.push(formattedDate)
        currentDate.setDate(currentDate.getDate() + 1)
    }
    const sessions = computed(() => store.state.eventStore.sessions)

    const totalList = dayList.map((date) => {
        const foundDay = sessions.value.dailySessions.find((item) => item.date === date)
        return foundDay ? parseInt(foundDay.totalSessions) : 0
    })

    chartData.value = {
        labels: dayList,
        datasets: [
            {
                label: 'Sessions',
                data: totalList,
                backgroundColor: '#FFC107',
                borderColor: '#FFC107',
                borderWidth: 1
            }
        ]
    }
})
</script>

<template>
    <EventStat title="Sessions" :rows="rows" :labels="labels">
        <Bar id="my-chart-id" :data="chartData" />
    </EventStat>
</template>

<style lang="scss"></style>
