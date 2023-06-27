<script setup>

  import Header from "@/App.vue";
  import Button from "@/components/atoms/Button.vue";

  const { title, variant, icon } = defineProps({
    title: {
      type: String,
      required: true
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

</script>

<template>
  <header class="header"
          :class="[variant ? 'header--' + variant : '']"
          v-on:click="onClick">
    <img src="@/assets/logo.svg" alt="logo" class="header-logo"/>
    <div>
      <nav>
        <Button icon="Dashboard" variant="xl-primary-bg-unset"/>
        <Button icon="Timeline" variant="xl-primary-bg-unset"/>
        <Button icon="AccountTree" variant="xl-primary-bg-unset"/>
        <Button icon="Settings" variant="xl-primary-bg-unset"/>
        <Button icon="Person" variant="xl-primary-bg-unset"/>
      </nav>
      <button>oui</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  padding: 1.625rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 6.25rem;
  height: 100vh;

  > div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;

    >nav{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 3.75rem;
    }
  }
}
</style>
