<script setup>
import PinCard from "@/components/molecules/PinCard.vue";
import Card from "@/components/molecules/Card.vue";
import { defineProps, defineEmits } from "vue";
import RoundedButton from "@/components/atoms/RoundedButton.vue";

const { dashboardEditMode } = defineProps({
  dashboardEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:setDateButton", "update:dashboardEditButton"]);
emit("update:setDateButton", true);
emit("update:dashboardEditButton", true);


</script>

<template>
  <div>
    <section class="pin-container">
      <PinCard title="Active users" description="10% less from last month" value="32" trend="up" :editMode="dashboardEditMode"/>
      <PinCard title="Active users" description="10% less from last month" value="33" trend="down" variant="primary" :editMode="dashboardEditMode"/>
      <PinCard title="Active users" description="10% less from last month" value="33" trend="down" variant="primary" :editMode="dashboardEditMode"/>
      <PinCard title="Active users" description="10% less from last month" value="33" trend="down" variant="primary" :editMode="dashboardEditMode"/>
    </section>
    <div class="dashboard-grid">
      <Card title="Bounce trade" buttonType="text" :editMode="dashboardEditMode" :path="'/analytics/'+ $route.params.site +'/audience/total-users'"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card title="Bounce trade" buttonType="rounded" :editMode="dashboardEditMode" path="/"/>
      <Card class="cta-add-card" v-if="dashboardEditMode">
        <RoundedButton icon="Close" variant="primary" size="md" :editMode="dashboardEditMode"/>
      </Card>
    </div>
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
    margin-top: 3rem;
    grid-column-gap: 2rem;
    grid-row-gap: 2.62rem;

    > .cta-add-card{
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover{
        background-color: #E0E0E0;
      }
    }

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
