<script setup>
import { RouterView } from 'vue-router'
document.addEventListener('locationchange', () => {
  console.log('badzbdaz');
});
</script>

<template>
    <RouterView />
</template>

<style lang="scss"></style>
