<script setup>
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import IconArrowDropUp from '@/components/icons/IconArrowDropUp.vue'
import IconCheckIndeterminate from '@/components/icons/IconCheckIndeterminate.vue'

const { trend, value, ratio } = defineProps({
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
        required: true
    }
})
</script>

<template>
    <td class="statRowData">
        <span class="value">{{ value }}</span>
        <IconArrowDropUp class="trend trend--up" v-if="trend == 'up'" />
        <IconArrowDropDown class="trend trend--down" v-if="trend == 'down'" />
        <IconCheckIndeterminate class="trend trend--same" v-if="trend == 'same'" />
        <span class="ratio">{{ ratio }}%</span>
    </td>
</template>

<style scoped lang="scss">
.statRowData {
    margin: 0.25rem 0;
    display: flex;
    gap: 0.5rem;
    flex-wrap: nowrap;
    align-items: center;

    .value {
        color: var(--color-text);
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1rem;
    }

    .ratio {
        color: var(--color-text);
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem;
    }

    .trend {
        height: fit-content;
        width: 1.8rem;

        &--up {
            fill: var(--color-success);
        }
        &--down {
            fill: var(--color-error);
        }
        &--same {
            fill: var(--color-warning);
        }
    }
}
</style>
