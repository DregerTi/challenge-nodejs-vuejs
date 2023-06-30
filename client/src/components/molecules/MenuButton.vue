<script setup>
  import IconEdit from "@/components/icons/IconEdit.vue";
  import IconCallSplit from "@/components/icons/IconCallSplit.vue";
  import IconGroup from "@/components/icons/IconGroup.vue";
  import IconPersonAdd from "@/components/icons/IconPersonAdd.vue";
  import IconPerson from "@/components/icons/IconPerson.vue";
  import IconBadge from "@/components/icons/IconBadge.vue";
  import IconAutoTimer from "@/components/icons/IconAutoTimer.vue";
  import IconRoundaboutRight from "@/components/icons/IconRoundaboutRight.vue";
  import IconExplore from "@/components/icons/IconExplore.vue";
  import IconDevices from "@/components/icons/IconDevices.vue";
  import IconTrendingUp from "@/components/icons/IconTrendingUp.vue";
  import IconTrackChanges from "@/components/icons/IconTrackChanges.vue";
  import IconLocalFire from "@/components/icons/IconLocalFire.vue";

  const { title, description, icon } = defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      validator: (value) => {
        return [
          'Edit'
        ].includes(value);
      }
    },
  });

</script>

<template>
  <section class="menu-button">
    <IconCallSplit v-if="icon == 'CallSplit'"/>
    <IconLocalFire v-if="icon == 'LocalFire'"/>
    <IconTrackChanges v-if="icon == 'TrackChanges'"/>
    <IconTrendingUp v-if="icon == 'TrendingUp'"/>
    <IconDevices v-if="icon == 'Devices'"/>
    <IconGroup v-if="icon == 'Group'"/>
    <IconPersonAdd v-if="icon == 'PersonAdd'"/>
    <IconPerson v-if="icon == 'Person'"/>
    <IconBadge v-if="icon == 'Badge'"/>
    <IconAutoTimer v-if="icon == 'AutoTimer'"/>
    <IconExplore v-if="icon == 'Explore'"/>
    <IconRoundaboutRight v-if="icon == 'RoundaboutRight'"/>
    <div>
      <h5>{{ title }}</h5>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.menu-button {
  display: flex;
  width: 17.5rem;
  height: 6.25rem;
  align-items: center;
  gap: 1.25rem;
  background-color: var(--color-light-grey);
  color: var(--color-light-black);
  border-radius: 32px;
  padding: 0 2rem;
  transition: all 0.2s ease-in-out;

  & svg{
    min-width: 1.7em;
    min-height: 1.7em;
    width: 1.7em;
    height: 1.7em;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;

    h5 {
      font-size: 1rem;
      font-weight: 600;
      line-height: 1rem;
      color: var(--color-light-black);
    }

    p{
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1rem;
      color: var(--color-grey);
    }
  }

  &:hover{
    background-color: var(--color-grey);
    color: var(--color-light-grey);
    cursor: pointer;

    > div {
      h5 {
        color: var(--color-light-grey);
      }
      p{
        color: var(--color-light-grey);
      }
    }
  }
}

@media (max-width: 1024px) {
  .menu-button{
    flex-direction: column;
    height: 12rem;
    padding: 0 1.6rem;
    justify-content: center;
    > div {
      > p{
        font-size: 0.75rem;
      }
    }
  }
}
</style>