<script setup>

  import Header from "@/App.vue";
  import Button from "@/components/atoms/Button.vue";
  import {ref} from "vue";


  const isOpen = ref(false);
  const isOpenBtn = 'xl-primary-bg-unset';
  const isCloseBtn = 'xl-bg-unset';
  const { variant } = defineProps({

  });

  function mouseLeave() {
    isOpen.value = false;
  }

  function mouseOver() {
    isOpen.value = true;
  }

</script>

<template>
  <header class="header"
          v-bind:class="[isOpen ? 'header--open' : '']"
          v-on:mouseover="mouseOver"
          v-on:mouseleave="mouseLeave">
    <img src="@/assets/logo.svg" alt="logo" class="header-logo"/>
    <div>
      <nav>
        <Button icon="Dashboard" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Dashboard' : ''"/>
        <Button icon="Timeline" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Audience' : ''"/>
        <Button icon="AccountTree" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Exlore' : ''"/>
        <Button icon="Person" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'My account' : ''"/>
        <Button icon="Settings" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Site settings' : ''"/>
      </nav>
      <button>oui</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  margin: 1.625rem 0rem 1.625rem 1.625rem;
  display: flex;
  padding: 1.625rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 4.5rem;
  height: calc(100vh - 3.25rem);
  width: fit-content;
  width: 82px;
  border-radius: 24px;
  background-color: unset;
  transition: all 0.3s ease-in-out;

  > .header-logo{
    width: 50px;
  }

  > div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;
    width: 100%;

    >nav{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: baseline;
      gap: 2.5rem;
      width: 100%;
    }
  }

  &.header--open{
    width: 280px;
    background-color: var(--color-light-black)
  }
}
</style>
