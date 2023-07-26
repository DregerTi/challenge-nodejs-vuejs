<script setup>
import { computed, defineEmits, onMounted, onUnmounted, watch } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'
import GoogleChart from '@/components/molecules/GChart.vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

const store = useStore()
const countriesBrute = computed(() => store.state.eventStore.countriesBrute)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getCountries')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceCountry')
    store.dispatch('getCountries')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceCountry')
})

const labels = ['Count', 'Total']
</script>

<template>
    <EventStat title="Localisation" :rows="countriesBrute" :labels="labels">
        <GoogleChart />
    </EventStat>
</template>

<style lang="scss"></style>
