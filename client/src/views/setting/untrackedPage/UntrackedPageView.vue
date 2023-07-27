<script setup>
import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import { computed, defineEmits, onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const untrackedPages = computed(() => store.state.untrackedPage.untrackedPages)

onBeforeMount(async () => {
    await store.dispatch('getUntrackedPages')
})

onUpdated(async () => {
    await store.dispatch('getUntrackedPage')
})

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
</script>

<template>
    <div class="mh">
        <ExploreLayout
            title="Untracked Pages"
            :items="untrackedPages"
            description="Manage the pages that are not tracked by the analytics script"
            :createNewPath="'/analytics/setting/' + $route.params.site + '/untracked-page/add'"
            :path="'/analytics/setting/' + $route.params.site + '/untracked-page'"
        >
        </ExploreLayout>
    </div>
</template>

<style scoped lang="scss">
.mh {
    height: 100%;
}
</style>
