<script setup>
import { defineEmits } from 'vue'
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'

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

const roles = ['Admin', 'User']
</script>

<template>
    <form class="event-form">
        <Input label="Username" type="text" placeholder="Username" name="username" />
        <Input
            label="Role"
            type="select"
            placeholder="Choose role"
            name="role"
            :values="roles"
            :value="value"
        />
        <Button title="Update" />
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
