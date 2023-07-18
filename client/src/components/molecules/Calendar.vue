<script setup>
import { ref } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const dateValue = ref([])
const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM'
})
const dDate = (date) => {
    return date > new Date()
}
</script>

<template>
    <vue-tailwind-datepicker
        placeholder="Select a date"
        separator=" - "
        :formatter="formatter"
        as-single
        use-range
        :disable-date="dDate"
        input-classes="pl-3 pr-3 py-2.5 rounded-lg overflow-hidden border-solid text-sm calendar"
        v-model="dateValue"
    />
</template>

<style scoped lang="scss">
::v-deep .calendar {
    width: 12rem;
    background-color: var(--color-light-black);
    color: var(--color-white);
}

::v-deep .calendar ~ div {
    display: none !important;
}
</style>
