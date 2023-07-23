<script setup>
import { onMounted, provide, ref } from "vue";
import * as siteUserService from "@/services/siteUserService";
import { siteUserKey, siteUsersKey, updateSiteUserKey } from "@/contexts/SiteUserProviderKeys";
import router from "@/router";

const siteUsers = ref(null);

async function getUsers(id, filters = "page=1") {
  siteUsers.value = await siteUserService.getSiteUsers(id, filters);
  siteUsers.value = siteUsers.value.map((user) => {
    user.title = user.email;
    user.role = user.SiteUsers[0].role;
    return user;
  });
}

async function siteUser(siteId, userId) {
  await siteUserService.getSiteUser(siteId, userId);
}

async function updateSiteUser(siteId, userId, role) {
  updateSiteUser.value = await siteUserService.updateSiteUser(siteId, userId, role);
}

onMounted(async () => {
  await getUsers(router.currentRoute.value.params.site);

});

provide(siteUsersKey, siteUsers);
provide(siteUserKey, siteUser)
provide(updateSiteUserKey, updateSiteUser)
</script>

<template>
    <slot v-bind="{ siteUsers, siteUser, updateSiteUser }"></slot>
</template>