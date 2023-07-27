<script setup>
import { computed, defineEmits, onBeforeMount, onMounted, onUnmounted, watch } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

let labels = ['page', 'views']

const store = useStore()
const viewPerPages = computed(() => store.state.eventStore.viewPerPages)
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
    <EventStat title="Page ranking" :rows="viewPerPages" :labels="labels">
        <div> <Line v-if="viewPerPagesBrute" :data="viewPerPagesBrute" /></div>
    </EventStat>
</template>

<style lang="scss"></style>
