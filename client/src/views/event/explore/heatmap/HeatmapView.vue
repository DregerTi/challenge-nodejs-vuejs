<script setup>
import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import { computed, defineEmits, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:setDateButton',
    'update:mdMenuExplore',
    'update:screenShotBtn'
])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:calendarBtn', false)
emit('update:mdMenuExplore', false)
emit('update:descriptionHidden', true)
emit('update:screenShotBtn', false)

let items = [
    {
        name: 'Heatmap 1',
        id: '3255'
    },
    {
        name: 'Heatmap 2',
        id: '32898'
    },
    {
        name: 'Heatmap 3',
        id: '322'
    },
    {
        name: 'Heatmap 4',
        id: '32'
    },
    {
        name: 'Heatmap 5',
        id: '3002'
    },
    {
        name: 'Heatmap 6',
        id: '3'
    },
    {
        name: 'Heatmap 7',
        id: '2'
    },
    {
        name: 'Heatmap 8',
        value: '1'
    }
]

const store = useStore()
const heatmapPaths = computed(() => store.state.eventStore.heatmapPaths)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getHeatmapPaths')
})

watch(rangeDate, () => {
    store.dispatch('closeEventSourceHeatmapPaths')
    store.dispatch('getHeatmapPaths')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceHeatmapPaths')
})
</script>

<template>
    <ExploreLayout
        title="Heatmaps"
        :items="heatmapPaths"
        description="See where your users click and scroll on your website"
        :path="'/analytics/' + $route.params.site + '/explore/heatmap'"
    >
    </ExploreLayout>
</template>

<style scoped lang="scss"></style>
