<script setup>
import { RouterView } from 'vue-router'
import Button from "@/components/atoms/Button.vue";
import Header from "@/components/organisms/Header.vue";
import {ref} from "vue";
import Listbox from "@/components/atoms/Listbox.vue";



const setDateButton = ref(false);
const dashboardEditButton = ref(false);
const dashboardEditMode = ref(false);

function toogleDashboardEditMode() {
  dashboardEditMode.value = !dashboardEditMode.value;
}


</script>

<template>
  <section class="body">
    <Header/>
    <div>
      <div class="container">
        <header>
          <Listbox variant="lg" selected="La route du trône" />
          <div class="actions">
            <Button v-if="setDateButton" title="This month"/>
            <Button v-if="dashboardEditButton && !dashboardEditMode" v-bind:onClick="toogleDashboardEditMode" icon="Edit"/>
            <Button v-if="dashboardEditButton && dashboardEditMode" v-bind:onClick="toogleDashboardEditMode" icon="Check"/>
          </div>
        </header>
        <RouterView
            :dashboardEditMode="dashboardEditMode"
            v-model:setDateButton="setDateButton"
            v-model:dashboardEditButton="dashboardEditButton"
        />
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
