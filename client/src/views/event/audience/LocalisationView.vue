<script setup>
import { computed, defineEmits, onMounted, onUnmounted, watch } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'
import GoogleChart from '@/components/molecules/GChart.vue'
import LocalisationWidget from '@/components/organisms/LocalisationWidget.vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

const store = useStore()
const countriesBrute = computed(() => store.state.eventStore.countriesBrute)

const labels = ['Count', 'Total']
</script>

<template>
    <EventStat title="Localisation" :rows="countriesBrute" :labels="labels">
        <LocalisationWidget />
    </EventStat>
</template>

<style lang="scss"></style>
