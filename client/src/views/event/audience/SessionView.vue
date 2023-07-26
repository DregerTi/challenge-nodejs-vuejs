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
import PinCard from '@/components/molecules/PinCard.vue'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

const store = useStore()
const sessions = computed(() => store.state.eventStore.sessions)
const sessionsBrute = computed(() => store.state.eventStore.sessionsBrute)

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
        <section class="chart-card--sessions">
            <div>
                <Bar id="chart-session" :data="sessions" />
            </div>
            <PinCard
                :value="sessionsBrute?.value"
                title="Total session"
                :trend="sessionsBrute?.trend"
            />
        </section>
    </EventStat>
</template>

<style lang="scss">
.chart-card--sessions {
    width: 100%;
    display: flex;
    gap: 4rem;
    > div {
        width: 70%;
    }
    & > .pin-container {
        width: 30%;
    }
}
</style>
