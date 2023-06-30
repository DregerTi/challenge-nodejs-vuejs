<script setup>
import PinCard from "@/components/molecules/PinCard.vue";
import MenuButton from "@/components/molecules/MenuButton.vue";
import Card from "@/components/molecules/Card.vue";

</script>

<template>
    <section class="pin-container">
      <PinCard title="Active users" description="10% less from last month" value="32" trend="up"/>
      <PinCard title="Active users" description="10% less from last month" value="33" trend="down" variant="primary"/>
      <PinCard title="Active users" description="10% less from last month" value="33" trend="down" variant="primary"/>
      <PinCard title="Active users" description="10% less from last month" value="33" trend="down" variant="primary"/>
    </section>
    <div class="dashboard-grid">
      <Card title="Bounce trade" buttonType="text" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" path="/"/>
    </div>
</template>

<style scoped lang="scss">
  .pin-container{
    display: flex;
    gap: 2rem;
    .pin-card{
      flex-grow: 1;
    }
  }

  .dashboard-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 2.62rem;

    > div{
      background-color: red;
    }
  }

  @media (max-width: 1024px) {
    .pin-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      .pin-card {
        width: 100% !important;
      }
    }

    .dashboard-grid{
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(6, 1fr);
      grid-row-gap: 1.5rem;
    }
  }


</style>
