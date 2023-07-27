<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, onUnmounted, watch } from 'vue'
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

const { variant } = defineProps({
    variant: {
        type: String,
        default: null
    }
})

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
    <section
        class="chart-card--sessions"
        :class="[variant ? 'chart-card--sessions--' + variant : '']"
    >
        <div>
            <Bar id="chart-session" :data="sessionsDuration" />
        </div>
        <PinCard
            :value="
                sessionsDurationBrute?.value != undefined
                    ? sessionsDurationBrute?.value
                    : 0 + ' min'
            "
            :description="sessionsDurationBrute?.description"
            title="Total session"
            :trend="sessionsDurationBrute?.trend"
        />
    </section>
</template>

<style lang="scss">
.chart-card--sessions {
    width: 100%;
    display: flex;
    gap: 4rem;

    > div {
        width: 70%;
    }

    & > .pin-card {
        width: 30%;
        height: auto;
    }

    &--sm {
        gap: 2rem;
        > div {
            width: 89%;
        }

        & > .pin-card {
            width: 23% !important;
        }
    }
}
@media (max-width: 768px) {
    .chart-card--sessions {
        flex-direction: column;
        gap: 2rem;

        > div {
            width: 100% !important;
        }

        .pin-card {
            width: 100% !important;
        }
    }
}
</style>
