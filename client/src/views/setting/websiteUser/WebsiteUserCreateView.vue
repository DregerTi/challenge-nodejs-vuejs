<script setup>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import { computed, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const formData = reactive({
  email: '',
  siteId: '',
})

const store = useStore()
const siteErrors = computed(() => store.state.siteStore.siteErrors)

onBeforeMount(async () => {
  await store.dispatch('getSite')
  formData.siteId = store.state.siteStore.site.id
})

const addSiteUser = async (formData) => {
  await store.dispatch('addSiteUser', formData)
}
</script>

<template>
  <div>
    <header class="flex justify-between items-base">
      <h2>Add a new user to you website</h2>
    </header>
    <h3>This user should already have an account</h3>
    <form @submit.prevent="addSiteUser(formData)" class="mt-12 mb-12 flex flex-col gap-4">
      <Input :error="siteErrors?.email" class="w-full" label="New user email" type="text" placeholder="Email" name="email"
        v-model:value="formData.email" />
      <Button type="submit" title="Submit" />
    </form>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;

  >span {
    color: var(--color-text-secondary);
    font-size: 1.2rem !important;
    line-height: 1.2rem !important;
    font-weight: 500;
  }

  >p {
    color: var(--color-text);
    font-size: 1rem !important;
    line-height: 1rem !important;
    font-weight: 500;
  }
}
</style>
