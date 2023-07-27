<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, onUnmounted, watch } from 'vue'
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
import PinCard from '@/components/molecules/PinCard.vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const { variant } = defineProps({
    variant: {
        type: String,
        default: null
    }
})

const store = useStore()
const newUser = computed(() => store.state.eventStore.newUser)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getNewUser')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceNewUser')
    store.dispatch('getNewUser')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceNewUser')
})
</script>

<template>
    <section
        class="chart-card--sessions"
        :class="[variant ? 'chart-card--sessions--' + variant : '']"
    >
        <div>
            <Line id="chart-session" :data="newUser?.chartData" />
        </div>
        <PinCard
            :value="newUser?.preview.value"
            :description="newUser?.preview.description"
            title="Total session"
            :trend="newUser?.preview.trend"
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
