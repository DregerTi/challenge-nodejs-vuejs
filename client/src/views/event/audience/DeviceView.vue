<script setup>
import { defineEmits } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import DeviceWidget from '@/components/organisms/DeviceWidget.vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)
</script>

<template>
    <EventStat title="Devices">
        <DeviceWidget />
    </EventStat>
</template>
