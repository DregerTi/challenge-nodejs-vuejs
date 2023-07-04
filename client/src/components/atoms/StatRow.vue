<script setup>
import StatRowData from "@/components/atoms/StatRowData.vue";

const { title, trend, value, ratio } = defineProps({
  title: {
    type: String,
    required: true,
  },
  trend: {
    type: String,
    validator: (value) => {
      return [
        'up',
        'down',
        'same'
      ].includes(value);
    }
  },
  value: {
    type: String,
    required: true,
  },
  ratio: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <li class="stat-row">
    <header>
      <h5>{{ title }}</h5>
      <StatRowData :trend="trend" :value="value" :ratio="ratio" />
    </header>
    <div>
      <div :style="'width:' + ratio + '%'"></div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.stat-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0rem;
  margin-bottom: 1rem;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1.25rem;
    > h5 {
      color: var(--color-text);
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.2rem;
    }
  }

  > div{
    width: 100%;
    height: 0.4rem;
    border-radius: 0.25rem;
    background-color: var(--color-text-third);
    overflow: hidden;
    > div{
      height: 100%;
      border-radius: 0.25rem;
      background-color: var(--color-text);
    }
  }
}
</style>
