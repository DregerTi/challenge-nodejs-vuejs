<script setup>
import Button from '@/components/atoms/Button.vue'
import { defineEmits, onMounted, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', false)
emit('update:dashboardEditButton', false)

const store = useStore()

const user = computed(() => store.state.userStore.user)

onBeforeMount(async () => {
    await store.dispatch('getMe')
})
</script>

<template>
    <div>
        <header class="flex justify-between items-base">
            <h2>My account</h2>
        </header>
        <div class="mt-12 mb-12 flex flex-col gap-4">
            <div class="info">
                <span>Firstname</span>
                <p>{{ user?.firstname }}</p>
            </div>
            <div class="info">
                <span>Lastname</span>
                <p>{{ user?.lastname }}</p>
            </div>
            <div class="info">
                <span>Email</span>
                <p>{{ user?.email }}</p>
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
