<script setup>

import {defineEmits} from "vue";
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/Button.vue";

const emit = defineEmits(['update:descriptionHidden', "update:deleteBtn", "update:calendarBtn", "update:updateBtn", "update:mdMenuExplore"])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:calendarBtn', false)
emit('update:mdMenuExplore', true)
emit('update:descriptionHidden', false)
</script>

<template>
  <form class="event-form">
    <Input
        label="New title for this conversion tunnel"
        type="text"
        placeholder="Purchase funnel"
        name="name"/>
    <Button title="Update"/>
  </form>
</template>

<style scoped lang="scss">

</style>