<script setup>

  import Header from "@/App.vue";
  import { RouterLink } from 'vue-router'
  import Button from "@/components/atoms/Button.vue";
  import {ref} from "vue";
  import Switch from "@/components/atoms/Switch.vue";

  const isOpen = ref(false);
  const isOpenBtn = 'xl-primary-bg-unset';
  const isCloseBtn = 'xl-bg-unset';

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
        <RouterLink to="/">
          <Button icon="Dashboard" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Dashboard' : ''"/>
        </RouterLink>
        <RouterLink to="/audience">
          <Button icon="Timeline" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Audience' : ''"/>
        </RouterLink>
        <RouterLink to="/explore">
          <Button icon="AccountTree" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Exlore' : ''"/>
        </RouterLink>
        <RouterLink to="">
          <Button icon="Person" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'My account' : ''"/>
        </RouterLink>
        <RouterLink to="">
          <Button icon="Settings" v-bind:variant="isOpen ? isCloseBtn : isOpenBtn" v-bind:title="isOpen ? 'Site settings' : ''"/>
        </RouterLink>
      </nav>
      <Switch class="switch" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 1.625rem;
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
    background-color: var(--color-light-black);
  }
}

@media (max-width: 1024px) {

  .header{
    z-index: 10;
    margin: 0;
    height: fit-content;
    border-radius: 0;
    position: fixed;
    padding: 1.4rem 1.4rem;
    background-color: var(--color-light-grey);
    top: calc(100vh - 92.5px);
    width: 100vw;
    > .header-logo{
      display: none;
    }

    .switch {
      display: none;
    }

    > div{
      > nav{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0;
        width: 100%;
      }
    }

    &.header--open{
      width: 100vw;
      max-width: 100vw;
    }
  }
}
</style>
