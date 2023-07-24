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
const conversionTunnels = computed(() => store.state.conversionTunnel.conversionTunnels)

onBeforeMount(async () => {
    await store.dispatch('getConversionTunnels')
})

onUpdated(async () => {
    await store.dispatch('getConversionTunnel')
})
</script>

<template>
    <ExploreLayout
        title="Conversion Tunnels"
        :items="conversionTunnels"
        description="Create and edit conversion tunnels to track the conversion journey or funnel"
        :createNewPath="'/analytics/' + $route.params.site + '/explore/conversion-tunnel/create'"
        :path="'/analytics/' + $route.params.site + '/explore/conversion-tunnel'"
    >
    </ExploreLayout>
</template>

<style scoped lang="scss"></style>
