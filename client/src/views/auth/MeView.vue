<script setup>
import Button from '@/components/atoms/Button.vue'
</script>

<template>
    <div>
        <header class="flex justify-between items-base">
            <h2>My account</h2>
            <RouterLink :to="'/analytics/' + $route.params.site + '/me/edit'">
                <Button icon="Edit" />
            </RouterLink>
        </header>
        <div class="mt-12 mb-12 flex flex-col gap-4">
            <div class="info">
                <span>Username</span>
                <p>Username value</p>
            </div>
            <div class="info">
                <span>Email</span>
                <p>example@email.com</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2rem;
    > span {
        color: var(--color-text-secondary);
        font-size: 1.2rem !important;
        line-height: 1.2rem !important;
        font-weight: 500;
    }
    > p {
        color: var(--color-text);
        font-size: 1rem !important;
        line-height: 1rem !important;
        font-weight: 500;
    }
}
</style>
