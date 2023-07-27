<script setup>
import { defineEmits } from 'vue'
import ListLayout from '@/components/templates/ListLayout.vue'
import { useStore } from 'vuex'
import { computed, onBeforeMount, ref } from 'vue'
import router from '@/router'

const emit = defineEmits(['update:deleteBtn'])
emit('update:deleteBtn', true)

const store = useStore()
const users = computed(() => store.state.siteStore.siteUsers)

let items = ref([])

onBeforeMount(async () => {
    await store.dispatch('getSiteUsers', router.currentRoute.value.params.site)
    items.value = users.value.map((user) => {
        return {
            id: user.id,
            title: user.email,
            role: user.SiteUsers[0].role,
            action: 'Edit'
        }
    })
})

const labels = ['Email', 'Role', 'Action']
</script>

<template>
    <ListLayout
        title="Website Users"
        :items="items"
        :labels="labels"
        createPath="website-users/invite"
        description="As website admin, manage all users and their permissions."
        :path="'/analytics/setting/' + $route.params.site + '/website-users'"
    >
    </ListLayout>
</template>

<style scoped lang="scss"></style>
