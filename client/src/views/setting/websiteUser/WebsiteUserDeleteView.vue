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
emit('update:deleteBtn', false)
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
})

const deleteSiteUser = async () => {
    await store.dispatch('deleteSiteUser', formData.email)
    router.push({ name: 'dashboard', params: { site: router.currentRoute.value.params.site } })
}
</script>

<template>
    <div class="event-form">
        <p>Are you sure you want to delete this user from your website ?</p>
        <div class="flex gap-4">
            <RouterLink
                class="w-full"
                :to="'/analytics/setting/' + $route.params.site + '/website-users'"
            >
                <Button title="Cancel" class="w-full" variant="light-grey" />
            </RouterLink>
            <Button title="Delete" class="w-full" variant="error" @click="deleteSiteUser()" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.event-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > p {
        color: var(--color-text);
    }
}
</style>
