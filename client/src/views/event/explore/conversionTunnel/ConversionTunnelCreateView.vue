<script setup>
import { computed, defineEmits, reactive } from 'vue'
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
emit('update:mdMenuExplore', true)
emit('update:calendarBtn', false)
emit('update:descriptionHidden', false)

const store = useStore()
const conversionTunnelsErrors = computed(() => store.state.conversionTunnel.conversionTunnelsErrors)

const createConversionTunnel = async (formData) => {
    await store.dispatch('createConversionTunnel', formData)
}

const formData = reactive({
    name: ''
})
</script>

<template>
    <form class="event-form" @submit.prevent="createConversionTunnel(formData)">
        <Input
            :error="conversionTunnelsErrors.name"
            label="Title for this new conversion tunnel"
            type="text"
            placeholder="Purchase funnel"
            name="name"
            v-model:value="formData.name"
        />
        <Button title="Create" type="submit" />
    </form>
</template>

<style scoped lang="scss"></style>
