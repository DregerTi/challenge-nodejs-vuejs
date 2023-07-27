<script setup>
import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import { computed, defineEmits, onBeforeMount, onUpdated } from 'vue'
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

const store = useStore()
const tags = computed(() => store.state.tag.tags)

onBeforeMount(async () => {
    await store.dispatch('getTags')
})

onUpdated(async () => {
    await store.dispatch('getTag')
})
</script>

<template>
    <ExploreLayout title="Tags" :items="tags"
        description="Create and edit tags to track your users' actions on your website"
        :createNewPath="'/analytics/' + $route.params.site + '/explore/tag/create'"
        :path="'/analytics/' + $route.params.site + '/explore/tag'">
    </ExploreLayout>
</template>

<style scoped lang="scss"></style>
