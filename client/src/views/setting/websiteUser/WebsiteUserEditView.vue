<script setup>
import { defineEmits, reactive } from 'vue'
import Button from '@/components/atoms/Button.vue'
import { useStore } from 'vuex'
import { computed, onBeforeMount } from 'vue'
import router from '@/router'

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

const store = useStore()
const user = computed(() => store.state.siteStore.siteUser)

let formData = reactive({})

onBeforeMount(async () => {
    await store.dispatch('getSiteUser', router.currentRoute.value.params.id)

    formData.email = user.value.email
    formData.id = user.value.id

    const roleSite = function () {
        for (let i = 0; i < user.value.SiteUsers.length; i++) {
            if (
                user.value.SiteUsers[i].siteId.toString() ===
                router.currentRoute.value.params.site.toString()
            ) {
                return user.value.SiteUsers[i].role
            }
        }
    }

    formData.permissions = roleSite()

    role(formData.permissions)
})

let admin

const role = function (value) {
    if (value === 'ADMIN') {
        return (formData.permissions = 'ADMIN'), (admin = false)
    } else {
        return (formData.permissions = 'USER'), (admin = true)
    }
}

const updateUser = async (formData) => {
    if (formData.permissions === 'ADMIN') {
        formData.permissions = 'USER'
    } else {
        formData.permissions = 'ADMIN'
    }

    await store.dispatch('updateSiteUser', formData)
    router.push({ name: 'dashboard', params: { site: router.currentRoute.value.params.site } })
}
</script>

<template>
    <form class="event-form" @submit.prevent="updateUser(formData)">
        <div class="info">
            <span>Email</span>
            <p>{{ formData.email }}</p>
        </div>

        <div class="info">
            <span>Role</span>
            <p>{{ formData.permissions }}</p>
        </div>

        <Button v-if="admin" type="submit" title="Make Admin" />
        <Button v-else type="submit" title="Make User" />
    </form>
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
