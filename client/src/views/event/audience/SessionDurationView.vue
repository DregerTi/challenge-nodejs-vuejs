<script setup>
import { computed, defineEmits, onMounted, onUnmounted, watch } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'
import PinCard from '@/components/molecules/PinCard.vue'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

const store = useStore()
const sessionsDuration = computed(() => store.state.eventStore.sessionsDuration)
const sessionsDurationBrute = computed(() => store.state.eventStore.sessionsDurationBrute)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getSessionsDuration')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceSessionDuration')
    store.dispatch('getSessionsDuration')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceSessionDuration')
})
</script>

<template>
    <EventStat title="Session duration">
        <section class="chart-card--sessions">
            <div>
                <Line id="chart-session-duration" :data="sessionsDuration" />
            </div>
            <PinCard
                :value="sessionsDurationBrute?.value + ' min'"
                title="Average session"
                :description="sessionsDurationBrute?.description"
                :trend="sessionsDurationBrute?.trend"
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
