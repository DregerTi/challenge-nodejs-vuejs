<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import GoogleChart from '@/components/molecules/GChart.vue'

const { variant } = defineProps({
    variant: {
        type: String,
        default: null
    }
})

const store = useStore()
const countriesBrute = computed(() => store.state.eventStore.countriesBrute)
const rangeDate = computed(() => store.state.eventStore.rangeDate)

onMounted(() => {
    store.dispatch('getCountries')
})
watch(rangeDate, () => {
    store.dispatch('closeEventSourceCountry')
    store.dispatch('getCountries')
})

onUnmounted(() => {
    store.dispatch('closeEventSourceCountry')
})
</script>

<template>
    <section
        class="chart-card--sessions chart-card--countries"
        :class="[variant ? 'chart-card--sessions--' + variant : '']"
    >
        <div>
            <GoogleChart />
        </div>
    </section>
</template>

<style lang="scss">
.chart-card--countries {
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart-card--sessions {
    width: 100%;
    display: flex;
    gap: 4rem;

    > div {
        width: 70%;
    }

    & > .pin-card {
        width: 30%;
        height: auto;
    }

    &--sm {
        gap: 2rem;
        > div {
            width: 89%;
        }

        & > .pin-card {
            width: 23%;
        }
    }
}
</style>
