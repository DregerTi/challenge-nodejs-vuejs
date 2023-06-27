<script setup>
  import IconAccountTree from "@/components/icons/IconAccountTree.vue";
  import IconArrowDropDown from "@/components/icons/IconArrowDropDown.vue";
  import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
  import IconDashboard from "@/components/icons/IconDashboard.vue";
  import IconArrowRight from "@/components/icons/IconArrowRight.vue";
  import IconPerson from "@/components/icons/IconPerson.vue";
  import IconSettings from "@/components/icons/IconSettings.vue";
  import IconTimeline from "@/components/icons/IconTimeline.vue";
  import IconTrackChanges from "@/components/icons/IconTrackChanges.vue";
  import IconTrendingDown from "@/components/icons/IconTrendingDown.vue";
  import IconTrendingUp from "@/components/icons/IconTrendingUp.vue";
  import IconEdit from "@/components/icons/IconEdit.vue";

  const { title, description, value, trend, variant } = defineProps({
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    value: {
      type: String,
    },
    trend: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: null,
    },
  });

  function handleClick() {
    alert('You clicked me!');
  }

</script>

<template>
  <section class="pinCard"
          :class="[variant ? 'pinCard--' + variant : '']">
    <h5>{{ value }}</h5>
    <label>{{ title }}</label>
    <p>{{ description }}</p>
    <IconTrendingDown class="trend-icon-down" v-if="trend == 'down'"/>
    <IconTrendingUp class="trend-icon-up" v-if="trend == 'up'"/>
  </section>
</template>

<style scoped lang="scss">
.pinCard {
  display: flex;
  width: 14.4rem;
  height: 11.875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 32px;
  background-color: var(--color-light-black);

  > h5{
    color: var(--color-white, #FCFCFC);
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.25rem;
  }

  > p{
    color: var(--color-white);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1rem;
  }

  > label{
    color: var(--color-grey);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 0.875rem;
  }

  > svg{
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--color-white);

    &.trend-icon-down{
      fill: var(--color-error);
    }

    &.trend-icon-up{
      fill: var(--color-success);
    }
  }
}
</style>
