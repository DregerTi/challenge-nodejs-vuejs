<script setup>
  import IconTrendingDown from "@/components/icons/IconTrendingDown.vue";
  import IconTrendingUp from "@/components/icons/IconTrendingUp.vue";
  import RoundedButton from "@/components/atoms/RoundedButton.vue";

  const { title, path } = defineProps({
    title: {
      required: true,
      type: String,
    },
    buttonType: {
      type: String,
      default: null,
      validator(value) {
        return [
          'text',
          'rounded'
        ].includes(value);
      }
    },
    path: {
      type: String,
    }
  });

</script>

<template>
  <section class="card">
    <header>
      <h5>{{ title }}</h5>
      <RouterLink v-if="buttonType != null" to="{{ path }}">
        <RoundedButton v-if="buttonType == 'rounded'" />
        <span v-if="buttonType == 'text'">See more</span>
      </RouterLink>
    </header>
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
.card{
  display: flex;
  padding: 1rem 1rem 1.9375rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5625rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 1.125rem;
  background-color: var(--color-white);

  > header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1.25rem;
    > h5 {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.25rem;
      color: var(--color-light-black);
    }

    span{
      color: var(--color-grey);
      font-size: 1rem;
      font-style: normal;
      line-height: 1rem;

      &:hover{
        color: var(--color-light-black);
      }
    }
  }
}

@media (max-width: 1024px) {
  .card {
    border-radius: 1rem;

    > header {
      > h5 {
        font-size: 1rem;
        line-height: 1rem;
      }
    }
  }
}
</style>
