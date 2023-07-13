<script setup>
import IconArrowUpward from '@/components/icons/IconArrowUpward.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconClose from '@/components/icons/IconClose.vue'
import StatRowData from '@/components/atoms/StatRowData.vue'

const { title, trend, value, ratio, index } = defineProps({
    title: {
        type: String,
        required: true
    },
    trend: {
        type: String,
        validator: (value) => {
            return ['up', 'down', 'same'].includes(value)
        }
    },
    value: {
        type: String,
        required: true
    },
    ratio: {
        type: String,
        required: false
    },
    index: {
        type: Number,
        required: false
    }
})
</script>

<template>
    <tr class="stat-row-xl">
        <td class="stat-row-xl-head">
            <span v-if="index">{{ index }}</span>
            <h5>{{ title }}</h5>
        </td>
        <slot></slot>
        <StatRowData v-if="ratio || trend || value" :trend="trend" :value="value" :ratio="ratio" />
    </tr>
</template>

<style lang="scss">
.stat-row-xl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
    > .stat-row-xl-head {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        > h5 {
            color: var(--color-text);
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.2rem;
        }
        > span {
            color: var(--color-text-secondary);
            font-size: 1.2rem;
            font-weight: 400;
            line-height: 1.2rem;
        }
    }
}
</style>
