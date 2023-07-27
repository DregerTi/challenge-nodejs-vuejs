<script setup>
import { defineEmits } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import TotalUsersWidget from '@/components/organisms/TotalUsersWidget.vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)
</script>

<template>
    <EventStat title="Total users">
        <TotalUsersWidget />
    </EventStat>
</template>

<style lang="scss"></style>
