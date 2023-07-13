<script setup>
import RoundedButton from '@/components/atoms/RoundedButton.vue'
import Listbox from '@/components/atoms/Listbox.vue'

const { title, path, buttonType, editMode } = defineProps({
    title: {
        required: true,
        type: String
    },
    buttonType: {
        type: String,
        default: null,
        validator(value) {
            return ['text', 'rounded'].includes(value)
        }
    },
    path: {
        type: String
    },
    editMode: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <section class="card">
        <header>
            <h5 v-if="!editMode">{{ title }}</h5>
            <Listbox v-if="editMode" :selected="title" variant="md" />
            <RouterLink v-if="buttonType != null && path" :to="path">
                <RoundedButton v-if="buttonType == 'rounded' && !editMode" icon="ArrowUpward" />
                <span v-if="buttonType == 'text' && !editMode">See more</span>
            </RouterLink>
            <RoundedButton v-if="editMode" icon="Add" />
        </header>
        <slot></slot>
        <slot name="chart"></slot>
    </section>
</template>

<style scoped lang="scss">
.card {
    display: flex;
    padding: 1rem 1rem 1.9375rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5625rem;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 1.125rem;
    background-color: var(--color-background-item);

    > header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 1.25rem;
        > h5 {
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.25rem;
            color: var(--color-text);
        }

        span {
            color: var(--color-text-secondary);
            font-size: 1rem;
            font-style: normal;
            line-height: 1rem;

            &:hover {
                color: var(--color-text);
            }
        }
    }
}

@media (max-width: 1024px) {
    .card {
        border-radius: 1rem;

        > header {
            > h5 {
                font-size: 1rem;
                line-height: 1rem;
            }
        }
    }
}
</style>
