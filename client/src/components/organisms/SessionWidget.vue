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
const sessions = computed(() => store.state.eventStore.sessions)
const sessionsBrute = computed(() => store.state.eventStore.sessionsBrute)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getSessions')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceSession')
    store.dispatch('getSessions')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceSession')
})
</script>

<template>
    <section
        class="chart-card--sessions"
        :class="[variant ? 'chart-card--sessions--' + variant : '']"
    >
        <div>
            <Bar id="chart-session" :data="sessions" />
        </div>
        <PinCard
            :value="sessionsBrute?.value"
            title="Total sessions"
            :description="sessionsBrute?.description"
            :trend="sessionsBrute?.trend"
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
            max-width: 23%;
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
            max-width: 100% !important;
            width: 100% !important;
        }
    }
}
</style>
