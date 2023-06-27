<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Button from "@/components/atoms/Button.vue";
import Header from "@/components/organisms/Header.vue";
</script>

<template>
  <Header/>
  <div class="container">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

        <Button title="dsdsd" icon="Settings"/>
        <Button title="dsdsd" icon="Settings" variant="xl"/>
        <Button title="dsdsd" icon="Settings" variant="bg-unset"/>
        <Button title="dsdsd" icon="Settings" variant="xl-bg-unset"/>

        <Button title="dsdsd" icon="Settings" variant="primary"/>
        <Button title="dsdsd" icon="Settings" variant="xl-primary"/>
        <Button title="dsdsd" icon="Settings" variant="xl-primary-bg-unset"/>

      </nav>
    </div>
  </div>

</template>

<style lang="scss">
</style>
