<script setup>
import { Line } from 'vue-chartjs'
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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
let labels = ['page', 'views']

const store = useStore()
const rangeDate = computed(() => store.state.eventStore.rangeDate)
const viewPerPagesBrute = computed(() => store.state.eventStore.viewPerPagesBrute)

onMounted(() => {
    store.dispatch('getViewPerPages')
})

watch(rangeDate, () => {
    store.dispatch('closeEventSourceViewPerPages')
    store.dispatch('getViewPerPages')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceViewPerPages')
})
</script>

<template>
    <section class="chart-card--sessions">
        <div><Line v-if="viewPerPagesBrute" :data="viewPerPagesBrute" /></div>
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
            width: 23%;
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
