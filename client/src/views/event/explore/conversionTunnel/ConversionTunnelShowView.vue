<script setup>
import { computed, defineEmits, onBeforeMount, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/atoms/Button.vue'
import router from '@/router'

const store = useStore()
const conversionTunnel = computed(() => store.state.conversionTunnel.conversionTunnel)
const conversionTunnelEvent = computed(() => store.state.eventStore.conversionTunnel)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
  store.dispatch('getConversionTunnelEvent')
})
watch(rangeDate, () => {
  store.dispatch('closeEventSourceConversionTunnelEvent')
  store.dispatch('getConversionTunnelEvent')
})

onUnmounted(() => {
  store.dispatch('closeEventSourceConversionTunnelEvent')
})
</script>

<template>
    <div>
        <h2 class="mb-10">
            {{ conversionTunnel?.name }}
        </h2>

        <Button
            title="Manage tags"
            class="w-full p-5"
            variant="light-grey"
            @click="router.push(router.currentRoute.value.path + '/settings')"
        />
        <section v-if="conversionTunnel">
            taux de réussite: {{ conversionTunnelEvent?.taux ?? 0 }}%
        </section>
    </div>
</template>

<style scoped lang="scss"></style>
