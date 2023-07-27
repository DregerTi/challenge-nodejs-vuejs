<script setup>
import Button from '@/components/atoms/Button.vue'
import router from '@/router'
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

const { id } = router.currentRoute.value.params

let url = ref('')

const store = useStore()

onBeforeMount(() => {
  console.log(router)
  url = `${import.meta.env.VITE_API_BASE_URL}invitations/${id}/accept`
  console.log(url)
})

const acceptInvitation = async () => {
  await store.dispatch('validateInvitation', id)

  // fetch(url, {
  //   method: 'GET',
  //   body: null,
  //   headers: {
  //     Authorization: `Bearer ${await tokenStorage.getToken()}`,
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       router.push({ name: 'Website-users-invitation-success' })
  //     } else {
  //       router.push({ name: 'Website-users-invitation-error' })
  //     }
  //   })
  //   .catch(() => {
  //     router.push({ name: 'Website-users-invitation-error' })
  //   })
}

</script>
<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-4xl font-bold mb-4">You received an invitation to Digital Analytics</h1>
    <h2 class="text-2xl">Accept it below to start viewing our dashboards 🚀</h2>

    <Button class="mt-4" color="primary" title="Accept invitation" @click="acceptInvitation" />
  </div>
</template>

<style scoped>
.h-screen {
  height: 100vh;
}
</style>