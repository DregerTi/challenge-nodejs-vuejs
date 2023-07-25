<script setup>
import Header from '@/components/organisms/Header.vue'
import Card from '@/components/molecules/Card.vue'
import StatList from '@/components/organisms/StatList.vue'

const { title, labels, rows } = defineProps({
    title: {
        type: String,
        required: true
    },
    rows: {
        type: Array,
        required: false
    },
    labels: {
        type: Array,
        required: false
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
    <div>
        <Card :title="title">
            <slot>
                <h1>Event Stats</h1>
                <p>fssd</p>
            </slot>
        </Card>
        <section v-if="rows">
            <StatList :labels="labels" :rows="rows" />
        </section>
    </div>
</template>

<style lang="scss"></style>
