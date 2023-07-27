<script setup>
import { computed, defineEmits, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/atoms/Button.vue'
import router from '@/router'

const store = useStore()
const conversionTunnel = computed(() => store.state.conversionTunnel.conversionTunnel)
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
    </div>
</template>

<style scoped lang="scss"></style>
