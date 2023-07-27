<script setup>
import StatRowXl from '@/components/atoms/StatRowXl.vue'
import StatRow from '@/components/atoms/StatRow.vue'

const { rows, labels, size, variant } = defineProps({
    rows: {
        type: Array,
        required: true
    },
    labels: {
        type: Array,
        required: false
    },
    size: {
        type: String,
        validator: (value) => {
            return ['sm', 'xl'].includes(value)
        },
        default: 'sm'
    },
    variant: {
        type: String,
        validator: (value) => {
            return ['default', 'sm'].includes(value)
        },
        default: 'default'
    }
})
</script>

<template>
    <table class="stat-list">
        <thead v-if="labels">
            <tr>
                <th>
                    <span v-for="label in labels" :key="label">{{ label }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <StatRow
                v-if="variant == 'sm'"
                v-for="row in rows"
                :key="row.title"
                :title="row.title"
                :trend="row.trend"
                :value="row.value"
                :ratio="row.ratio"
            />
            <StatRowXl
                v-if="variant == 'default'"
                v-for="row in rows"
                :key="row.title"
                :title="row.title"
                :trend="row.trend"
                :value="row.value"
                :ratio="row.ratio"
            />
        </tbody>
    </table>
</template>

<style lang="scss">
.stat-list {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    > thead {
        > tr {
            > th {
                display: flex;
                justify-content: space-between;
                align-items: center;
                > span {
                    color: var(--color-text);
                    font-size: 1.2rem;
                    font-weight: 500;
                    padding: 1rem 0;
                    &:first-child {
                        padding-left: 0rem;
                        text-align: left;
                    }
                    &:last-child {
                        padding-right: 0rem;
                        text-align: right;
                    }
                }
            }
        }
    }
    > tbody {
        > tr {
            padding: 0.1rem 0.8rem;
            border-radius: 0.6rem;
            &:nth-child(even) {
                background-color: var(--color-text-third);
            }
            border-bottom: none;
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
