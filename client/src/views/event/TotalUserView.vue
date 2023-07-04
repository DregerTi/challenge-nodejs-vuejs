<script setup>
import Header from "@/components/organisms/Header.vue";
import MenuButton from "@/components/molecules/MenuButton.vue";
import {defineEmits} from "vue";
import Card from "@/components/molecules/Card.vue";
import StatRow from "@/components/atoms/StatRow.vue";
import StatRowXl from "@/components/atoms/StatRowXl.vue";
import StatList from "@/components/organisms/statList.vue";

const emit = defineEmits(["update:setDateButton", "update:dashboardEditButton"]);
emit("update:setDateButton", true);
emit("update:dashboardEditButton", false);

let labels = ['page', 'views'];
let rows = [
      {
        'title': 'Home',
        'value': '3255',
        'trend': 'up',
        'ratio': '23'
      },
      {
        'title': 'dsk 1',
        'value': '32898',
        'trend': 'down',
        'ratio': '23'
      },
      {
        'title': 'df dffdf d',
        'value': '322',
        'trend': 'down',
        'ratio': '23'
      },
      {
        'title': 'df dfdfdgh d',
        'value': '32',
        'trend': 'up',
        'ratio': '2'
      },
      {
        'title': 'sdf fddf dffd',
        'value': '32',
        'trend': 'up',
        'ratio': '33'
      },
      {
        'title': 'fsd',
        'value': '3',
        'trend': 'down',
        'ratio': '23'
      },
      {
        'title': 'sdfdsf',
        'value': '2',
        'trend': 'same',
        'ratio': '21'
      },
      {
        'title': 'sd ges d',
        'value': '1',
        'trend': 'up',
        'ratio': '3'
      },
];

</script>

<template>
  <Card title="Total users">

  </Card>
  <section>
    <StatRow title="oui" ratio="32" value="345" trend="up"/>
    <StatRowXl title="oui" ratio="32" value="345" trend="up" index="1"/>
    <StatList :labels="labels" :rows="rows"/>
    <StatList :rows="rows" variant="sm"/>
  </section>
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
