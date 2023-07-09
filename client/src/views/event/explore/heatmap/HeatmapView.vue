<script setup>
import ExploreLayout from "@/components/organisms/ExploreLayout.vue";
import {defineEmits} from "vue";

const emit = defineEmits(['update:descriptionHidden', "update:deleteBtn", "update:calendarBtn", "update:updateBtn", "update:setDateButton", "update:mdMenuExplore", "update:screenShotBtn"])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:calendarBtn', false)
emit('update:mdMenuExplore', false)
emit('update:descriptionHidden', true)
emit('update:screenShotBtn', false)

let items = [
    {
        title: 'Heatmap 1',
        id: '3255'
    },
    {
        title: 'Heatmap 2',
        id: '32898'
    },
    {
        title: 'Heatmap 3',
        id: '322'
    },
    {
        title: 'Heatmap 4',
        id: '32'
    },
    {
        title: 'Heatmap 5',
        id: '3002'
    },
    {
        title: 'Heatmap 6',
        id: '3'
    },
    {
        title: 'Heatmap 7',
        id: '2'
    },
    {
        title: 'Heatmap 8',
        value: '1'
    }
]
</script>

<template>
  <ExploreLayout
      title="Heatmaps"
      :items="items"
      description="See where your users click and scroll on your website"
      :path="'/analytics/' + $route.params.site + '/explore/heatmap'"
  >
  </ExploreLayout>
</template>

<style scoped lang="scss">
</style>