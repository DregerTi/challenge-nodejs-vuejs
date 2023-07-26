<script setup>
import { computed, defineEmits, onMounted, onUnmounted, watch } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import StatList from '@/components/organisms/StatList.vue'
ChartJS.register(ArcElement, Tooltip, Legend)

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

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
    <EventStat title="Devices">
        <section class="chart-card--devices">
            <div>
                <Doughnut id="chart-device" :data="devices" />
            </div>
            <StatList :rows="devicesBrute" variant="sm" />
        </section>
    </EventStat>
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
