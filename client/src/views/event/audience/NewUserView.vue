<script setup>
import { defineEmits } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import NewUsersWidget from '@/components/organisms/NewUsersWidget.vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)
</script>

<template>
    <EventStat title="New users">
        <NewUsersWidget />
    </EventStat>
</template>

<style lang="scss"></style>
