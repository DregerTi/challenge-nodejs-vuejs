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
        title: 'UntrackedPage 1',
        id: '3255'
    },
    {
        title: 'UntrackedPage 2',
        id: '32898'
    },
    {
        title: 'UntrackedPage 3',
        id: '322'
    },
    {
        title: 'UntrackedPage 4',
        id: '32'
    },
    {
        title: 'UntrackedPage 5',
        id: '3002'
    },
    {
        title: 'UntrackedPage 6',
        id: '3'
    },
    {
        title: 'UntrackedPage 7',
        id: '2'
    },
    {
        title: 'UntrackedPage 8',
        value: '1'
    }
]
</script>

<template>
    <ExploreLayout
        title="Untracked Pages"
        :items="items"
        description="Manage the pages that are not tracked by the analytics script"
        :createNewPath="'/analytics/' + $route.params.site + '/setting/untracked-page/add'"
        :path="'/analytics/' + $route.params.site + '/setting/untracked-page'"
    >
    </ExploreLayout>
</template>

<style scoped lang="scss"></style>
