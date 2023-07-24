<script setup>
import { computed, defineEmits, onBeforeMount } from 'vue'
import Button from '@/components/atoms/Button.vue'
import { useStore } from 'vuex'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore'
])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:calendarBtn', false)
emit('update:mdMenuExplore', true)
emit('update:descriptionHidden', false)

const store = useStore()
const conversionTunnel = computed(() => store.state.conversionTunnel.conversionTunnel)

const deleteConversionTunnel = async (id) => {
    await store.dispatch('deleteConversionTunnel', id)
}

onBeforeMount(async () => {
    await store.dispatch('getConversionTunnel')
})
</script>

<template>
    <div class="event-form">
        <p>
            Are you sure you want to delete this conversion funnel-
            <b>{{ conversionTunnel?.name }}</b
            >?
        </p>
        <div class="flex gap-4">
            <RouterLink
                class="w-full"
                :to="{
                    name: 'conversion-tunnel',
                    params: { site: $route.params.site, id: conversionTunnel?.id }
                }"
            >
                <Button title="Cancel" class="w-full" variant="light-grey" />
            </RouterLink>
            <Button
                title="Delete"
                class="w-full"
                variant="error"
                @click="deleteConversionTunnel(conversionTunnel?.id)"
            />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
