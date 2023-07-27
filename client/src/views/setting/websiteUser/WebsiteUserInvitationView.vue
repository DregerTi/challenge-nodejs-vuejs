<script setup>
import Button from '@/components/atoms/Button.vue'
import router from '@/router'
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

const { id } = router.currentRoute.value.params

const store = useStore()

const acceptInvitation = async () => {
    await store.dispatch('validateInvitation', id)
}
</script>
<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <h1 class="text-4xl font-bold mb-4">You received an invitation to Digital Analytics</h1>
        <h2 class="text-2xl">Accept it below to start viewing our dashboards 🚀</h2>

        <Button class="mt-4" color="primary" title="Accept invitation" @click="acceptInvitation" />
    </div>
</template>

<style scoped>
.h-screen {
    height: 100vh;
}
</style>
