<script setup>
import {defineEmits} from "vue";
import EventStat from "@/components/templates/EventStat.vue";

const emit = defineEmits(["update:setDateButton", "update:dashboardEditButton"]);
emit("update:setDateButton", true);
emit("update:dashboardEditButton", false);

let labels = ['page', 'views'];
let rows = [
      {
        'title': 'Home',
        'value': '3255',
        'trend': 'up',
        'ratio': '23'
      },
      {
        'title': 'dsk 1',
        'value': '32898',
        'trend': 'down',
        'ratio': '23'
      },
      {
        'title': 'df dffdf d',
        'value': '322',
        'trend': 'down',
        'ratio': '23'
      },
      {
        'title': 'df dfdfdgh d',
        'value': '32',
        'trend': 'up',
        'ratio': '2'
      },
      {
        'title': 'sdf fddf dffd',
        'value': '32',
        'trend': 'up',
        'ratio': '33'
      },
      {
        'title': 'fsd',
        'value': '3',
        'trend': 'down',
        'ratio': '23'
      },
      {
        'title': 'sdfdsf',
        'value': '2',
        'trend': 'same',
        'ratio': '21'
      },
      {
        'title': 'sd ges d',
        'value': '1',
        'trend': 'up',
        'ratio': '3'
      },
];

</script>

<template>
 <EventStat title="New users" :rows="rows" :labels="labels" />
</template>

<style lang="scss">
</style>
