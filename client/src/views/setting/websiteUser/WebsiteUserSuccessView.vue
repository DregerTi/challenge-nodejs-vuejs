<script setup>
import Button from '@/components/atoms/Button.vue'
import router from '@/router'
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <h1 class="text-4xl font-bold mb-4">Welcome to Digital Analytics !</h1>
        <h2 class="text-2xl">Let's start viewing dashboards 🚀</h2>
        <Button
            class="mt-4"
            color="primary"
            title="Go to dashboard"
            @click="() => router.push('/dashboard')"
        />
    </div>
</template>

<style scoped>
.h-screen {
    height: 100vh;
}
</style>
