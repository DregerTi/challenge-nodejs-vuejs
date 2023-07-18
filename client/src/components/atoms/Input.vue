<script setup>
import Listbox from '@/components/atoms/Listbox.vue'

const { type, placeholder, value, label, name, variant, error } = defineProps({
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
                'select',
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
    values: {
        type: Array,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: false
    },
    error: {
        type: String,
        required: false
    }
})

const emit = defineEmits(['update:value'])
</script>

<template>
    <div class="input" :class="[variant ? 'input--' + variant : '']">
        <label v-if="label">{{ label }}</label>
        <input
            v-if="type != 'select'"
            :type="type"
            :placeholder="placeholder"
            @input="$emit('update:value', $event.target.value)"
            :value="value"
            :name="name"
            :id="name"
        />
        <Listbox v-else :selected="placeholder" :values="values" :name="name" variant="lite" />
        <p v-if="error">
            {{ Array.isArray(error) ? error.join('\n') : error }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.6rem 0rem;
    position: relative;
    > label {
        color: var(--color-text-secondary);
        font-size: 1rem !important;
        line-height: 1rem !important;
        font-weight: 500;
    }
    > p {
        color: var(--color-error);
        position: absolute;
        bottom: -0.7rem;
        font-size: 0.85rem;
        line-height: 1.1rem;
        font-weight: 400;
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

    &--search {
        > input {
            background: url(@/assets/search.svg) no-repeat scroll calc(100% - 10px) 10px;
            padding-right: 40px;
        }
    }
}
</style>
