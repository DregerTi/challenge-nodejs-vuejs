<script setup>
import { defineEmits } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import SessionWidget from '@/components/organisms/SessionWidget.vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)
</script>

<template>
    <EventStat title="Sessions">
        <SessionWidget />
    </EventStat>
</template>
