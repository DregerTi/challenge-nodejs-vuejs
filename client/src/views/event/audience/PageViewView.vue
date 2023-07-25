<script setup>
import { computed, defineEmits, onBeforeMount } from 'vue'
import EventStat from '@/components/templates/EventStat.vue'
import { useStore } from 'vuex'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', false)

let labels = ['page', 'views']
let rows = [
    {
        title: 'Home',
        value: '3255',
        trend: 'up',
        ratio: '23'
    },
    {
        title: 'dsk 1',
        value: '32898',
        trend: 'down',
        ratio: '23'
    },
    {
        title: 'df dffdf d',
        value: '322',
        trend: 'down',
        ratio: '23'
    },
    {
        title: 'df dfdfdgh d',
        value: '32',
        trend: 'up',
        ratio: '2'
    },
    {
        title: 'sdf fddf dffd',
        value: '32',
        trend: 'up',
        ratio: '33'
    },
    {
        title: 'fsd',
        value: '3',
        trend: 'down',
        ratio: '23'
    },
    {
        title: 'sdfdsf',
        value: '2',
        trend: 'same',
        ratio: '21'
    },
    {
        title: 'sd ges d',
        value: '1',
        trend: 'up',
        ratio: '3'
    }
]

let viewPerPages = {
    topFive: [
        {
            viewsPerDay: [
                {
                    date: '2023-07-25',
                    total: '1000'
                },
                {
                    date: '2023-07-24',
                    total: '900'
                },
                {
                    date: '2023-07-23',
                    total: '800'
                },
                {
                    date: '2023-07-22',
                    total: '750'
                },
                {
                    date: '2023-07-20',
                    total: '700'
                }
            ]
        }
    ],
    pages: [
        {
            path: '/example-page-1',
            currentTotal: '5000',
            previousTotal: '4500'
        },
        {
            path: '/example-page-2',
            currentTotal: '3000',
            previousTotal: '2800'
        },
        {
            path: '/example-page-3',
            currentTotal: '2000',
            previousTotal: '1800'
        },
        {
            path: '/example-page-4',
            currentTotal: '1500',
            previousTotal: '1400'
        },
        {
            path: '/example-page-5',
            currentTotal: '1000',
            previousTotal: '900'
        }
    ]
}

const range = ['2023-07-19', '2023-07-25']
const startDate = new Date(range[0])
const endDate = new Date(range[1])

const dayList = []

const currentDate = new Date(startDate)
while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().slice(0, 10)
    dayList.push(formattedDate)
    currentDate.setDate(currentDate.getDate() + 1)
}

const totalList = dayList.map((date) => {
    const foundDay = viewPerPages.topFive.viewsPerDay.find((item) => item.date === date)
    return foundDay ? parseInt(foundDay.total) : 0
})

console.log(totalList)

console.log(dayList)

//create dynamique array with each day in range

viewPerPages.pages = viewPerPages.pages.map((page) => {
    const trend = page.currentTotal > page.previousTotal ? 'up' : 'down'
    return {
        title: page.path,
        value: page.currentTotal,
        trend: trend
    }
})

//fill viewPerPages

onBeforeMount(async () => {
    await store.dispatch('getViewPerPages')
})
</script>

<template>
    {{ viewPerPages }}
    <EventStat title="Page ranking" :rows="viewPerPages.pages" :labels="labels"> </EventStat>
</template>

<style lang="scss"></style>
