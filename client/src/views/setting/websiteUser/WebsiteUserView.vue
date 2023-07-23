<script setup>
import { defineEmits } from 'vue'
import ListLayout from '@/components/templates/ListLayout.vue'
import SiteUserProvider from '@/contexts/SiteUserProvider.vue'

const emit = defineEmits(['update:deleteBtn'])
emit('update:deleteBtn', true)

const labels = ['Email', 'Role', 'Action']
</script>

<template>
    <div>
      <SiteUserProvider #default="{ siteUsers }">
        <ListLayout
          title="Website Users"
          :items="siteUsers"
          :labels="labels"
          createPath="/"
          description="As website admin, manage all users and their permissions."
          :path="'/analytics/' + $route.params.site + '/setting/website-users'"
        >
        </ListLayout>
      </SiteUserProvider>
    </div>
</template>

<style scoped lang="scss"></style>