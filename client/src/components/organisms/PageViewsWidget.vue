<script setup>
import { Line } from "vue-chartjs";
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted, watch } from "vue";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
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
  <div> <Line v-if="viewPerPagesBrute" :data="viewPerPagesBrute" /></div>
</template>
