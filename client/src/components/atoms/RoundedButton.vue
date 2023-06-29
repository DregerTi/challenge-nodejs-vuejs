<script setup>
import IconArrowUpward from "@/components/icons/IconArrowUpward.vue";
</script>

<template>
  <button class="rounded-button">
    <IconArrowUpward />
  </button>
</template>

<style scoped lang="scss">
.rounded-button {
  display: flex;
  width: 2.1875rem;
  height: 2.1875rem;
  padding: 0.375rem;
  justify-content: center;
  align-items: center;
  background-color: var(--color-light-black);
  color: var(--color-white);
  border-radius: 3.125rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  > svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: var(--color-white);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--color-light-grey);
    > svg {
      fill: var(--color-light-black);
    }
  }
}
</style>
