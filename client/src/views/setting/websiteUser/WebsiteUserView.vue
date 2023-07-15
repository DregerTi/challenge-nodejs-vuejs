<script setup>
import { defineEmits } from 'vue'
import ListLayout from '@/components/templates/ListLayout.vue'

const emit = defineEmits(['update:deleteBtn'])
emit('update:deleteBtn', true)

const labels = ['Email', 'Role', 'Action']

let items = [
    {
        title: 'User 1',
        id: '3255',
        created_at: '2021-09-01',
        role: 'user'
    },
    {
        title: 'User 2',
        id: '32898',
        created_at: '2021-09-01',
        role: 'admin'
    },
    {
        title: 'User 3',
        id: '322',
        created_at: '2021-09-01',
        role: 'user'
    },
    {
        title: 'User 4',
        id: '32',
        created_at: '2021-09-01',
        role: 'user'
    },
    {
        title: 'User 5',
        id: '3002',
        created_at: '2021-09-01',
        role: 'user'
    },
    {
        title: 'User 6',
        id: '3',
        created_at: '2021-09-01',
        role: 'user'
    },
    {
        title: 'User 7',
        id: '2',
        created_at: '2021-09-01',
        role: 'user'
    },
    {
        title: 'User 8',
        id: '12123',
        created_at: '2021-09-01',
        role: 'admin'
    }
]
</script>

<template>
    <ListLayout
        title="Website Users"
        :items="items"
        :labels="labels"
        createPath="/"
        description="As website admin, manage all users and their permissions."
        :path="'/analytics/' + $route.params.site + '/setting/website-users'"
    >
    </ListLayout>
</template>

<style scoped lang="scss"></style>
