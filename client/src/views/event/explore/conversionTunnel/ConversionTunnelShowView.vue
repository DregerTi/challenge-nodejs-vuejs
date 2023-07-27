<script setup>
import { computed, defineEmits, onBeforeMount } from 'vue'
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
const users = computed(() => store.state.siteStore.role)

let userRole = ''

onBeforeMount(async () => {
    await store.dispatch('getConversionTunnel', router.currentRoute.value.params.id)
    await store.dispatch('getRole')

    users.value.forEach((user) => {
        if (user.siteId.toString() === router.currentRoute.value.params.site.toString()) {
            return (userRole = user.role)
        }
    })
})
</script>

<template>
    <div>
        <h2 class="mb-10">
            {{ conversionTunnel?.name }}
        </h2>

        <Button
            v-if="userRole === 'ADMIN'"
            title="Manage tags"
            class="w-full p-5"
            variant="light-grey"
            @click="router.push(router.currentRoute.value.path + '/settings')"
        />
    </div>
</template>

<style scoped lang="scss"></style>
