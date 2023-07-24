<script setup>
import { computed, defineEmits, onBeforeMount, reactive } from 'vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import { useStore } from 'vuex'

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
const conversionTunnel = computed(() => store.state.conversionTunnel.conversionTunnel)
const conversionTunnelsErrors = computed(() => store.state.conversionTunnel.conversionTunnelsErrors)

const updateConversionTunnel = async (formData) => {
    await store.dispatch('updateConversionTunnel', formData)
}

let formData = reactive({})
onBeforeMount(async () => {
    await store.dispatch('getConversionTunnel')
    formData.name = conversionTunnel.value.name
    formData.id = conversionTunnel.value.id
})
</script>

<template>
    <form class="event-form" @submit.prevent="updateConversionTunnel(formData)">
        <Input
            :error="conversionTunnelsErrors?.name"
            label="New title for this conversion tunnel"
            type="text"
            placeholder="Purchase funnel"
            name="name"
            v-model:value="formData.name"
        />
        <Button title="Update" type="submit" />
    </form>
</template>

<style scoped lang="scss"></style>
