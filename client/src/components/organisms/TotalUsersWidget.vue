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
const totalUser = computed(() => store.state.eventStore.totalUser)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getTotalUser')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceTotalUser')
    store.dispatch('getTotalUser')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceTotalUser')
})
</script>

<template>
    <section
        class="chart-card--sessions"
        :class="[variant ? 'chart-card--sessions--' + variant : '']"
    >
        <div>
            <Line id="chart-session" :data="totalUser?.chartData" />
        </div>
        <PinCard
            :value="totalUser?.preview.value"
            title="Total users"
            :trend="totalUser?.preview.trend"
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
</style>
