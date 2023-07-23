<script setup>
import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import { defineEmits } from 'vue'
import UntrackedPageProvider from '@/contexts/UntrackedPageProvider.vue'

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
        <UntrackedPageProvider #default="{ untrackedPages, errors }">
            <ExploreLayout
                title="Untracked Pages"
                :items="untrackedPages"
                description="Manage the pages that are not tracked by the analytics script"
                :createNewPath="'/analytics/' + $route.params.site + '/setting/untracked-page/add'"
                :path="'/analytics/' + $route.params.site + '/setting/untracked-page'"
            >
            </ExploreLayout>
        </UntrackedPageProvider>
    </div>
</template>

<style scoped lang="scss">
.mh {
    height: 100%;
}
</style>
