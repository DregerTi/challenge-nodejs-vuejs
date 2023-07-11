<script setup>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
</script>

<template>
    <div>
        <header class="flex justify-between items-base">
            <h2>My account</h2>
        </header>
        <div class="mt-12 mb-12 flex flex-col gap-4">
            <Input
                class="w-full"
                label="Username"
                type="text"
                placeholder="Firstname Lastname"
                name="Username"
            />
            <Input
                class="w-full"
                label="Email"
                type="text"
                placeholder="example@email.com"
                name="email"
            />
            <Button title="Save" />
        </div>
    </div>
</template>

<style scoped lang="scss">
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
