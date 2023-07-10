<script setup>

import {defineEmits} from "vue";
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/Button.vue";

const emit = defineEmits(['update:descriptionHidden', "update:deleteBtn", "update:calendarBtn", "update:updateBtn", "update:mdMenuExplore"])
emit('update:deleteBtn', false)
emit('update:updateBtn', false)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', false)
emit('update:descriptionHidden', false)

</script>

<template>
  <form class="event-form">
    <Input
      label="URL of the page you want to exclude"
      type="text"
      placeholder="https://example.com/checkout"
      name="name"/>
    <Button title="Create"/>
  </form>
</template>

<style scoped lang="scss">

</style>