<script setup>
const { type, placeholder, value, label, name } = defineProps({
    type: {
        type: String,
        default: 'text',
        validator: (value) => {
            return [
                'text',
                'password',
                'email',
                'number',
                'date',
                'time',
                'datetime-local',
                'search',
                'tel',
                'url',
                'month',
                'week',
                'color'
            ].includes(value)
        }
    },
    placeholder: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: ''
    },
    label: {
        type: String
    },
    name: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="input">
        <label v-if="label">{{ label }}</label>
        <input :type="type" :placeholder="placeholder" :value="value" :name="name" />
    </div>
</template>

<style scoped lang="scss">
.input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.6rem 0rem;
    > label {
        color: var(--color-text-secondary);
        font-size: 1rem !important;
        line-height: 1rem !important;
        font-weight: 500;
    }
    > input {
        border: unset;
        padding: 0.625rem;
        font-size: 0.875rem;
        line-height: 1.5rem;
        font-weight: 400;
        color: var(--color-text);
        border-radius: 0.375rem;
        background-color: var(--color-background-item);
    }
}
</style>
