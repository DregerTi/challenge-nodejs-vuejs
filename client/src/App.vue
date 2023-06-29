<script setup>
import { RouterView } from 'vue-router'
import Button from "@/components/atoms/Button.vue";
import Header from "@/components/organisms/Header.vue";
import {ref} from "vue";

const setDateButton = ref(true);
const dashboardEditButton = ref(true);

</script>

<template>
  <section class="body">
    <Header/>
    <div>
      <div class="container">
        <header>
          <h1>La route du trone</h1>
          <div class="actions">
            <Button v-if="setDateButton" title="This month"/>
            <Button v-if="dashboardEditButton" icon="Edit"/>
          </div>
        </header>
        <RouterView />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .body{
    width: 100%;
    display: flex;
    justify-content: space-between;
    transition: all .3s;

    > div{
      display: flex;
      justify-content: center;
      width: 100%;

      .container{
        width: 100%;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        gap: 2.625rem;
        margin: 5rem 0;

        > header{
          display: flex;
          justify-content: space-between;
          align-items: center;

          .actions{
            display: flex;
            gap: 1rem;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .body{
      > div{
        .container{
          padding: 0 1rem;
          margin: 1.4rem 0;
          margin-bottom: 4rem;
        }
      }
    }
  }
</style>
