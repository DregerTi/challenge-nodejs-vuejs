<script setup>
import Button from '@/components/atoms/Button.vue'
import { useStore } from 'vuex'
import { computed, onMounted, onBeforeMount } from 'vue'

const store = useStore()
const site = computed(() => store.state.siteStore.site)

onMounted(async () => {
    await store.dispatch('getSite')
})

</script>

<template>
    <div>
        <header class="flex justify-between items-base">
            <h2>Web site informations</h2>
            <RouterLink :to="'/analytics/setting/' + $route.params.site + '/website-info/edit'">
                <Button icon="Edit" />
            </RouterLink>
        </header>
        <div class="mt-12 mb-12 flex flex-col gap-4">
            <div class="info">
                <span>Web site name</span>
                <p>{{ site?.name }}</p>
            </div>
            <div class="info">
                <span>Web site URL</span>
                <p>{{ site?.url }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2rem;

    >span {
        color: var(--color-text-secondary);
        font-size: 1.2rem !important;
        line-height: 1.2rem !important;
        font-weight: 500;
    }

    >p {
        color: var(--color-text);
        font-size: 1rem !important;
        line-height: 1rem !important;
        font-weight: 500;
    }
}
</style>
