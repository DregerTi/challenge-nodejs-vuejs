<script setup>
import { computed } from 'vue'
import { GChart } from 'vue-google-charts'
import { useStore } from 'vuex'

const options = {
    colorAxis: { colors: ['#69c6d7', 'black', '#127788'] },
    backgroundColor: '#e3e3e3',
    keepAspectRatio: true
}

const data = computed(() => useStore().state.eventStore.countries)
</script>

<template>
    <GChart
        :data="data"
        :options="options"
        type="GeoChart"
        :settings="{ packages: ['geochart'] }"
    />
</template>
