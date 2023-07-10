<script setup>

import {defineEmits} from "vue";

const emit = defineEmits(['update:descriptionHidden', "update:deleteBtn", "update:calendarBtn", "update:updateBtn", "update:mdMenuExplore"])
emit('update:deleteBtn', true)
emit('update:updateBtn', true)
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', false)
emit('update:descriptionHidden', false)
</script>

<template>

  <div>
    sddssd
  </div>

</template>

<style scoped lang="scss">

</style>