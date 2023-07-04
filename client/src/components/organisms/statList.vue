<script setup>

import StatRowXl from "@/components/atoms/StatRowXl.vue";

const { rows, labels, size } = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
  size: {
    type: String,
    validator: (value) => {
      return [
        'sm',
        'xl'
      ].includes(value);
    },
    default: 'sm',
  },
});
</script>

<template>
  <table class="stat-list">
    <thead>
      <tr>
        <th v-for="label in labels" :key="label">{{ label }}</th>
      </tr>
    </thead>
    <tbody>
      <StatRowXl v-for="row in rows" :key="row.title" index="1" :title="row.title" :trend="row.trend" :value="row.value" :ratio="row.ratio" />
    </tbody>
  </table>
</template>

<style lang="scss">
.stat-list{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  > thead {
    > tr {
      > th {
        color: var(--color-light-black);
        font-size: 1.2rem;
        font-weight: 500;
        padding: 1rem 0;
        &:first-child {
          padding-left: 0rem;
          text-align: left;
        }
        &:last-child {
          padding-right: 0rem;
          text-align: right;
        }
      }
    }
  }
  > tbody {
    > tr {
      padding: 0rem 0.8rem;
      border-radius: 0.6rem;
      &:nth-child(even) {
        background-color: var(--color-light-grey);
      }
      border-bottom: none;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>