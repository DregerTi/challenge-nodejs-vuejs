<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'
import StatList from '@/components/organisms/StatList.vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const { variant } = defineProps({
    variant: {
        type: String,
        default: null
    }
})

const store = useStore()
const devices = computed(() => store.state.eventStore.devices)
const devicesBrute = computed(() => store.state.eventStore.devicesBrute)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getDevices')
})

watch(rangeDate, () => {
    store.dispatch('closeEventSourceDevice')
    store.dispatch('getDevices')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceDevice')
})
</script>

<template>
    <section className="chart-card--devices">
        <div>
            <Doughnut id="chart-device" :data="devices" />
        </div>
        <StatList :rows="devicesBrute" variant="sm" />
    </section>
</template>

<style lang="scss">
.chart-card--devices {
    width: 100%;
    display: flex;
    gap: 4rem;

    #my-chart-id {
        width: 100%;
    }

    > div {
        width: 40%;
    }

    & > table {
        width: 60%;
    }
}
</style>
