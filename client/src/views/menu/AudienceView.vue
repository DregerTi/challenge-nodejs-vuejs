<script setup>
import Header from "@/components/organisms/Header.vue";
import MenuButton from "@/components/molecules/MenuButton.vue";
import {defineEmits} from "vue";

const emit = defineEmits(["update:setDateButton", "update:dashboardEditButton"]);
emit("update:setDateButton", false);
emit("update:dashboardEditButton", false);

</script>

<template>
  <div class="container-menu">
    <header>
      <h2>Audience</h2>
      <p>
        Learn more about the audience that visit your website
      </p>
    </header>
    <section>
      <MenuButton icon="Group" title="Total users" description="Displays the total number of users on your website" :path="'/analytics/'+ $route.params.site +'/audience/total-users'"/>
      <MenuButton icon="PersonAdd" title="New users" description="Tracks the number of new users visiting your website" :path="'/analytics/'+ $route.params.site +'/audience/new-users'"/>
      <MenuButton icon="Person" title="Active users" description="Number of currently active users on your website" :path="'/analytics/'+ $route.params.site +'/audience/active-users'"/>
      <MenuButton icon="Badge" title="Sessions" description="Analyzes the total number of sessions" :path="'/analytics/'+ $route.params.site +'/audience/sessions'"/>
      <MenuButton icon="AutoTimer" title="Session duration" description="Measures the average duration of sessions" :path="'/analytics/'+ $route.params.site +'/audience/avg-sessions'"/>
      <MenuButton icon="RoundaboutRight" title="Bounce rate" description="Percentage of users who leave without interaction" :path="'/analytics/'+ $route.params.site +'/audience/bounce-rate'"/>
      <MenuButton icon="TrendingUp" title="Page views" description="Ranking and performance of your individual pages" :path="'/analytics/'+ $route.params.site +'/audience/page-views'"/>
      <MenuButton icon="Devices" title="Devices" description="User devices accessing your website" :path="'/analytics/'+ $route.params.site +'/audience/devices'"/>
      <MenuButton icon="Explore" title="Localisation" description="Identifies the geographic location of visitors" :path="'/analytics/'+ $route.params.site +'/audience/localisation'"/>
    </section>
  </div>
</template>

<style lang="scss">
  .container-menu{
    margin-top: 5rem;
    > section{
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 5rem 0;
    }
    > header {
      display: flex;
      flex-direction: column;
      align-items: baseline!important;
      > h2{
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--color-grey);
      }
      > p {
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--color-grey);
      }
    }
  }

  @media (max-width: 1024px) {
    .container-menu{
      margin-top: 0rem;
      > section{
        display: grid;
        margin: 2rem 0;
        gap: 1.4rem;
        width: calc(100% - 1.4rem);
        grid-template-columns: 50% 50%;
        > .menu-button{
          width: 100%;
        }
      }
      > header {
        > h2{
          font-size: 1.2rem;
        }
        > p {
          font-size: 1rem;
        }
      }
    }
  }
</style>
