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
        title: 'Tag 1',
        id: '3255'
    },
    {
        title: 'Tag 2',
        id: '32898'
    },
    {
        title: 'Tag 3',
        id: '322'
    },
    {
        title: 'Tag 4',
        id: '32'
    },
    {
        title: 'Tag 5',
        id: '3002'
    },
    {
        title: 'Tag 6',
        id: '3'
    },
    {
        title: 'Tag 7',
        id: '2'
    },
    {
        title: 'Tag 8',
        value: '1'
    }
]
</script>

<template>
    <ExploreLayout
        title="Tags"
        :items="items"
        description="Create and edit tags to track your users' actions on your website"
        :createNewPath="'/analytics/' + $route.params.site + '/explore/tag/create'"
        :path="'/analytics/' + $route.params.site + '/explore/tag'"
    >
    </ExploreLayout>
</template>

<style scoped lang="scss"></style>
