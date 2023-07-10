<script setup>

import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/Button.vue";
</script>

<template>

  <div>
    <h2>
      Web site API key
    </h2>
    <div class="mt-12 mb-12 flex gap-4 items-end">
      <Input
        class="grow"
        label="API key"
        type="text"
        placeholder="API key"
        name="name"
      />
      <Button icon="Autorenew" class="h-fit mb-2.5"/>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>