<script setup>
import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import { defineEmits } from 'vue'

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
        title: 'Conversion Tunnel 1',
        id: '3255'
    },
    {
        title: 'Conversion Tunnel 2',
        id: '32898'
    },
    {
        title: 'Conversion Tunnel 3',
        id: '322'
    },
    {
        title: 'Conversion Tunnel 4',
        id: '32'
    },
    {
        title: 'Conversion Tunnel 5',
        id: '3002'
    },
    {
        title: 'Conversion Tunnel 6',
        id: '3'
    },
    {
        title: 'Conversion Tunnel 7',
        id: '2'
    },
    {
        title: 'Conversion Tunnel 8',
        value: '1'
    }
]
</script>

<template>
    <ExploreLayout
        title="Conversion Tunnels"
        :items="items"
        description="Create and edit conversion tunnels to track the conversion journey or funnel"
        :createNewPath="'/analytics/' + $route.params.site + '/explore/conversion-tunnel/create'"
        :path="'/analytics/' + $route.params.site + '/explore/conversion-tunnel'"
    >
    </ExploreLayout>
</template>

<style scoped lang="scss"></style>
