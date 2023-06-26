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

  const { title, variant, icon } = defineProps({
    title: {
      type: String,
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => {
        return [
          'default',
          'round',
          'square'
        ].includes(value);
      }
    },
    icon: {
      type: String,
      default: 'ArrowLeft',
      validator: (value) => {
        return [
          'ArrowLeft',
          'ArrowRight',
          'AccountTree',
          'ArrowDropDown',
          'ArrowLeft',
          'ArrowRight',
          'Dashboard',
          'Person',
          'Settings',
          'Timeline',
          'TrackChanges',
          'TrendingDown',
          'TrendingUp',
          'Edit'
        ].includes(value);
      }
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  });

  function handleClick() {
    alert('You clicked me!');
  }

</script>

<template>
  <button class="button"
          :class="[variant ? 'button--' + variant : '']"
          v-on:click="onClick">

    <IconArrowLeft v-if="icon == 'ArrowLeft'"/>
    <IconArrowRight v-if="icon == 'ArrowRight'"/>
    <IconAccountTree v-if="icon == 'AccountTree'"/>
    <IconArrowDropDown v-if="icon == 'ArrowDropDown'"/>
    <IconArrowLeft v-if="icon == 'ArrowLeft'"/>
    <IconArrowRight v-if="icon == 'ArrowRight'"/>
    <IconDashboard v-if="icon == 'Dashboard'"/>
    <IconPerson v-if="icon == 'Person'"/>
    <IconSettings v-if="icon == 'Settings'"/>
    <IconTimeline v-if="icon == 'Timeline'"/>
    <IconTrackChanges v-if="icon == 'TrackChanges'"/>
    <IconTrendingDown v-if="icon == 'TrendingDown'"/>
    <IconTrendingUp v-if="icon == 'TrendingUp'"/>
    <IconEdit v-if="icon == 'Edit'"/>

    <p v-if="title">{{ title }}</p>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  border:none;
  background-color: var(--color-light-black);
  color: var(--color-white);
  font-weight: 700;
  font-size: rem(16);
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  font-size: 1rem;
  line-height: 1rem;
  text-transform: capitalize;

  & svg{
    min-width: 1.1em;
    min-height: 1.1em;
    width: 1.1em;
    height: 1.1em;
  }

  &:hover {
    background-color: var(--color-light-grey);
    color: var(--color-light-black);
  }

  &--bg-unset{
    background-color: unset;
    color: var(--color-white);

    &:hover {
      background-color: unset;
      color: var(--color-primary);
    }
  }

  &--light-grey{
    background-color: var(--color-light-grey);
    color: var(--color-light-black);

    &:hover {
      background-color: var(--color-light-black);
      color: var(--color-light-grey);
    }

    &--bg-unset{
      background-color: unset;
      color: var(--color-light-black);

      &:hover {
        background-color: unset;
        color: var(--color-primary);
      }
    }
  }

  &--primary{
    background-color: var(--color-primary);
    color: var(--color-light-black);

    &:hover {
      background-color: var(--color-light-black);
      color: var(--color-primary);
    }

    &--bg-unset{
      background-color: unset;
      color: var(--color-light-black);

      &:hover {
        background-color: unset;
        color: var(--color-primary);
      }
    }
  }

  &--xl{
    gap: 0.62rem;
    font-size: 1.25rem;
    line-height: 1.25rem;
    border-radius: 14px;

    & svg{
      min-width: 1.25em;
      min-height: 1.25em;
      width: 1.25em;
      height: 1.25em;
    }

    &--light-grey{
      background-color: var(--color-light-grey);
      color: var(--color-light-black);

      &:hover {
        background-color: var(--color-light-black);
        color: var(--color-light-grey);
      }

      &--bg-unset{
        background-color: unset;
        color: var(--color-light-black);

        &:hover {
          background-color: unset;
          color: var(--color-primary);
        }
      }
    }

    &--primary{
      background-color: var(--color-primary);
      color: var(--color-light-black);

      &:hover {
        background-color: var(--color-light-black);
        color: var(--color-primary);
      }

      &--bg-unset{
        background-color: unset;
        color: var(--color-light-black);

        &:hover {
          background-color: unset;
          color: var(--color-primary);
        }
      }
    }

  }


}
</style>
