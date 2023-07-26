<script setup>
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import { computed, onBeforeMount } from 'vue'

const store = useStore()

const rangeDate = computed(() => store.state.eventStore.rangeDate)

const dateValue = {
    startDate: rangeDate.value.startDate ?? dayjs().add(-29, 'day').format('YYYY-MM-DD'),
    endDate: rangeDate.value.endDate ?? dayjs().format('YYYY-MM-DD')
}

const formatter = {
    date: 'YYYY-MM-DD',
    month: 'MMM'
}
const dDate = (date) => {
    return date > new Date()
}

const onClickSomething = (dateValue) => {
    store.commit('setRangeDate', dateValue)
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
        input-classes="pl-3 pr-3 py-2.5 rounded-lg overflow-hidden border-solid text-sm calendar date-picoeur"
        v-model="dateValue"
        @click="onClickSomething(dateValue)"
    />
</template>

<style scoped lang="scss">
::v-deep .calendar {
    width: 100%;
    background-color: var(--color-light-black);
    color: var(--color-white);
}

::v-deep .calendar ~ div {
    display: none !important;
}
</style>
