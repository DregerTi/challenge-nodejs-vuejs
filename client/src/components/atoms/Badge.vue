<script setup>
const { value } = defineProps({
    value: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="badge">{{ value }}</div>
</template>

<style scoped lang="scss">
.badge {
    background-color: var(--color-primary);
    color: var(--color-light-black);
    padding: 0.3rem 0.5rem;
    border-radius: 20px;
}
</style>
