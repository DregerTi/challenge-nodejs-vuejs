<script setup>
import { defineEmits } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import SessionDurationWidget from '@/components/organisms/SessionDurationWidget.vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)
</script>

<template>
    <EventStat title="Session duration">
        <SessionDurationWidget />
    </EventStat>
</template>

<style lang="scss">
.chart-card--sessions {
    width: 100%;
    display: flex;
    gap: 4rem;

    > div {
        width: 70%;
    }

    & > .pin-container {
        width: 30%;
    }
}
</style>
