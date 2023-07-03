<script setup>
import IconArrowUpward from "@/components/icons/IconArrowUpward.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import IconClose from "@/components/icons/IconClose.vue";

const { trend, value, ratio } = defineProps({
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
  <div class="statRowData">
    <span class="value">{{ value }}</span>
    <IconArrowUpward class="trend trend--up" v-if="trend == 'up'"/>
    <IconArrowUpward class="trend trend--down" v-if="trend == 'down'"/>
    <IconClose class="trend trend--same" v-if="trend == 'same'"/>
    <span class="ratio">{{ ratio }}%</span>
  </div>
</template>

<style scoped lang="scss">
.statRowData{
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  align-items: center;

  .value{
    color: var(--color-text);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem;
  }

  .ratio{
    color: var(--color-text);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
  }

  .trend{
    width: 1rem;
    &--up{
      fill: var(--color-success);
    }
    &--down{
      fill: var(--color-error);
    }
    &--same{
      fill: var(--color-text);
    }
  }
}

</style>
