<script setup>
import { defineEmits, onBeforeMount, ref } from "vue";
import SiteUserProvider from '@/contexts/SiteUserProvider.vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import router from "@/router";
import * as siteUserService from "@/services/siteUserService";
import { siteUserKey } from "@/contexts/SiteUserProviderKeys";
import Listbox from "@/components/atoms/Listbox.vue";

const emit = defineEmits([
    'update:descriptionHidden',
    'update:deleteBtn',
    'update:calendarBtn',
    'update:updateBtn',
    'update:mdMenuExplore'
])
emit('update:deleteBtn', true)
emit('update:updateBtn', false)
emit('update:calendarBtn', false)
emit('update:mdMenuExplore', true)
emit('update:descriptionHidden', false)

const permissions = [{ name: 'ADMIN' }, { name: 'USER' }]
const userToEdit = ref(null)

let role = ref(null);
onBeforeMount( async () => {
  userToEdit.value = await siteUserService.getSiteUser(router.currentRoute.value.params.site, router.currentRoute.value.params.userId)
  //userToEdit.value = await siteUserService.getSiteUser(router.currentRoute.value.params.site, router.currentRoute.value.params.userId)
  role.value = userToEdit.value.SiteUsers[0].role
  console.log(role);
})
</script>

<template>
    <div>
        <SiteUserProvider #default="{ updateSiteUser }">
            <form
                class="event-form"
                @submit.prevent="updateSiteUser($route.params.site, $route.params.userId, role)"
            >
                <div class="info">
                    <span>Email</span>
                    <p>{{ userToEdit?.email }}</p>
                </div>
              <Input
                v-model="role"
                label="Permissions"
                :placeholder="role"
                :value="role"
                type="select"
                name="permissions"
                :values="permissions"
              />
                <Button title="Update" />
            </form>
        </SiteUserProvider>
    </div>
</template>

<style scoped lang="scss">
.event-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > * {
        width: 100%;
    }
    margin: 4rem 0;
}
</style>