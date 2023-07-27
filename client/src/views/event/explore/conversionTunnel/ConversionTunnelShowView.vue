<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/atoms/Button.vue'
import router from '@/router'

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore'
])
emit('update:deleteBtn', true)
emit('update:updateBtn', true)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', true)
emit('update:descriptionHidden', false)

const store = useStore()
const conversionTunnel = computed(() => store.state.conversionTunnel.conversionTunnel)
</script>

<template>
    <div>
        <h2 class="mb-10">
            {{ conversionTunnel?.name }}
        </h2>

        <Button
            title="Voir les tags"
            class="w-full p-5"
            variant="light-grey"
            @click="router.push(router.currentRoute.value.path + '/settings')"
        />
    </div>
</template>

<style scoped lang="scss"></style>
