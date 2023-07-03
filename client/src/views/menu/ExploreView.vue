<script setup>
import Header from "@/components/organisms/Header.vue";
import MenuButton from "@/components/molecules/MenuButton.vue";
import {defineEmits} from "vue";

const emit = defineEmits(["update:setDateButton", "update:dashboardEditButton"]);
emit("update:setDateButton", false);
emit("update:dashboardEditButton", false);
</script>

<template>
  <div class="container container-menu">
    <header>
      <h2>Explore</h2>
      <p>
        Learn more about the activity of your users
      </p>
    </header>
    <section>
      <MenuButton icon="CallSplit" title="Conversion tunnel" description="Tracks the conversion journey or funnel" path="/"/>
      <MenuButton icon="LocalFire" title="Heatmaps" description="Interaction patterns on your website" path="/"/>
      <MenuButton icon="TrackChanges" title="Tag" description="Create events for customized analysis" path="/"/>
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