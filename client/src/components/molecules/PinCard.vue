<script setup>
  import IconTrendingDown from "@/components/icons/IconTrendingDown.vue";
  import IconTrendingUp from "@/components/icons/IconTrendingUp.vue";
  import Listbox from "@/components/atoms/Listbox.vue";
  import RoundedButton from "@/components/atoms/RoundedButton.vue";

  const { title, description, value, trend, variant, editMode } = defineProps({
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
    editMode: {
      type: Boolean,
      default: false,
    },
  });

</script>

<template>
  <section class="pin-card"
          :class="[variant ? 'pin-card--' + variant : '']">
    <Listbox v-if="editMode" :selected="title" variant="sm"/>
    <h5 v-if="!editMode">{{ value }}</h5>
    <label v-if="!editMode">{{ title }}</label>
    <p v-if="!editMode">{{ description }}</p>
    <IconTrendingDown v-if="!editMode && trend == 'down'" class="trend-icon-down"/>
    <IconTrendingUp v-if="!editMode && trend == 'up'" class="trend-icon-up"/>
  </section>
</template>

<style scoped lang="scss">
.pin-card {
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
  color: var(--color-white) !important;
  position: relative;

  > h5{
    color: var(--color-white, #FCFCFC);
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.25rem;
  }

  > label{
    color: var(--color-white);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1rem;
  }

  > p{
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

  &--primary{
    background-color: var(--color-primary);

    > h5{
      color: var(--color-light-black, #FCFCFC);
    }

    > p{
      color: var(--color-grey);
    }

    > label{
      color: var(--color-light-black);
    }
  }
}

@media (max-width: 1024px) {
  .pin-card {
    padding: 1rem;
    gap: 0.3rem;
    display: grid;
    height: unset;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    grid-template-areas:
      "trend value"
      "trend title"
      "trend description";
    grid-column-gap: 1rem;
    border-radius: 1.25rem;

    > h5{
      grid-area: value;
      font-size: 1.3rem;
    }

    > label{
      grid-area: title;
      font-size: 0.8rem;
    }

    > p{
      grid-area: description;
      font-size: 0.7rem;
      display: none;
    }

    > svg{
      grid-area: trend;
    }
  }
}
</style>
