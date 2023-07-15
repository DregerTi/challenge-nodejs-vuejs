<script setup>
import Button from '@/components/atoms/Button.vue'
import Header from '@/components/organisms/Header.vue'
import { defineEmits, ref } from 'vue'
import Input from '@/components/atoms/Input.vue'
import StatRowXl from '@/components/atoms/StatRowXl.vue'
import Badge from '@/components/atoms/Badge.vue'

const deleteBtn = ref(true)

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', false)
emit('update:dashboardEditButton', false)

const { title, items, path, labels, description, createPath } = defineProps({
    title: {
        type: String,
        required: true
    },
    createPath: {
        type: String,
        required: false
    },
    items: {
        type: Array,
        required: false
    },
    labels: {
        type: Array,
        required: false
    },
    createNewPath: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})
</script>

<template>
    <div class="container-list">
        <section>
            <header>
                <div>
                    <div>
                        <h2>
                            {{ title }}
                        </h2>
                        <p v-if="description" class="pt-3">
                            {{ description }}
                        </p>
                    </div>
                    <div v-if="$route.params.id">
                        <RouterLink :to="$route.params.id + '/delete'">
                            <Button icon="Delete" variant="error" />
                        </RouterLink>
                    </div>
                </div>
            </header>
        </section>
        <header>
            <RouterLink v-if="createPath" :to="createPath">
                <Button title="Add user" />
            </RouterLink>
            <Input type="text" placeholder="Search" name="search" variant="search" />
            <table>
                <thead v-if="labels">
                    <tr>
                        <th>
                            <span v-for="label in labels" :key="label">{{ label }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <RouterLink v-for="item in items" :to="path + '/' + item.id + '/edit'">
                        <StatRowXl :key="item.id" :title="item.title" :value="item.createdAt">
                            <template v-slot:default>
                                <div v-if="item.role">
                                    <Badge :value="item.role" />
                                </div>
                                <div class="flex gap-2">
                                    <Button icon="Edit" variant="bg-unset" />
                                    <RouterLink :to="path + '/' + item.id + '/delete'">
                                        <Button icon="Delete" variant="error-bg-unset" />
                                    </RouterLink>
                                </div>
                            </template>
                        </StatRowXl>
                    </RouterLink>
                </tbody>
            </table>
        </header>
    </div>
</template>

<style lang="scss">
.container-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;

    > header {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        z-index: 1;
        width: 100%;
        padding: 1.2rem;
        margin-top: 2rem;
        background-color: var(--color-background-item);
        border-radius: 1rem;
        > a {
            width: 100%;
            > * {
                width: 100%;
            }
        }

        > .input {
            width: 100%;
            padding: 0;
            > input {
                width: 100%;
                border-radius: 10px !important;
                background-color: var(--color-dark-grey);

                &::placeholder {
                    /* Chrome, Firefox, Opera, Safari 10.1+ */
                    color: var(--color-grey);
                    opacity: 1; /* Firefox */
                }

                &:-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: var(--color-grey);
                }

                &::-ms-input-placeholder {
                    /* Microsoft Edge */
                    color: var(--color-grey);
                }
            }
        }

        thead {
            > tr {
                > th {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    > span {
                        color: var(--color-text);
                        font-size: 1.2rem;
                        font-weight: 500;
                        padding: 1rem 0;
                        &:first-child {
                            padding-left: 0rem;
                            text-align: left;
                        }
                        &:last-child {
                            padding-right: 0rem;
                            text-align: right;
                        }
                    }
                }
            }
        }
        tbody {
            a {
                .stat-row-xl {
                    padding: 0.1rem 0.8rem;
                    border-radius: 0.6rem;
                    height: 42px;
                }

                &:nth-child(even) {
                    .stat-row-xl {
                        background-color: var(--color-text-third);
                    }
                }

                border-bottom: none;
            }
        }
    }
}
@media (max-width: 1024px) {
}
</style>
