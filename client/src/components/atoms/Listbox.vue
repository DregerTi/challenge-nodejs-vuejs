<script setup>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { RouterLink } from 'vue-router'

const { title, variant, values, selected } = defineProps({
    values: {
        type: Array
    },
    selected: {
        type: String,
        required: false
    },
    variant: {
        type: String,
        default: 'lg'
    },
    path: {
        type: String,
        required: false
    }
})

const emit = defineEmits(['update:selected'])

const selectedValue = ref(selected)
watch(selectedValue, (newValue) => {
    emit('update:selected', newValue)
})
</script>

<template>
    <div class="listbox" :class="[variant ? 'listbox--' + variant : '']">
        <Listbox v-model="selectedValue">
            <div class="relative">
                <ListboxButton class="pr-10 focus:outline-none sm:text-sm">
                    <span class="block truncate listbox-label">{{
                        selectedValue ? selectedValue : values[0].name
                    }}</span>
                    <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="value in values"
                            :key="value.name"
                            :value="value.name"
                            as="template"
                        >
                            <RouterLink
                                v-if="path"
                                :to="{ name: 'dashboard', params: { site: value.id } }"
                            >
                                <li
                                    :class="[
                                        active ? 'bg-primary listbox-primary' : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-10 pr-4'
                                    ]"
                                >
                                    <span
                                        :class="[
                                            selected ? 'font-medium' : 'font-normal',
                                            'block truncate'
                                        ]"
                                        >{{ value.name }}</span
                                    >
                                    <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 listbox-primary"
                                    >
                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </li>
                            </RouterLink>
                            <li
                                v-else
                                :class="[
                                    active ? 'bg-primary listbox-primary' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                            >
                                <span
                                    :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate'
                                    ]"
                                    >{{ value.name }}</span
                                >
                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 listbox-primary"
                                >
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<style scoped lang="scss">
.listbox {
    &--sm {
        .listbox-label {
            color: var(--color-text);
            font-size: 1rem;
            font-weight: 600;
        }
    }

    &--md {
        .listbox-label {
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.25rem;
            height: 1.25rem !important;
        }
    }

    &--lg {
        .listbox-label {
            font-size: 2rem !important;
            font-weight: 600 !important;
            line-height: 2rem !important;
            height: 2rem !important;
        }
    }

    & :first-child {
        border-radius: 8px;
        cursor: pointer;
        border: none;
        position: relative;
        transition: all 0.2s ease-in-out;
        width: 100%;
        text-align: left;
        color: var(--color-text);

        & > span:nth-child(2) {
            z-index: 7;
            transition: all 0.2s ease-in-out;
        }

        & .listbox-primary {
            color: var(--color-primary);
        }

        & ul {
            z-index: 8;
            background-color: var(--color-background-item);
        }
    }
}

@media (max-width: 1024px) {
    .listbox {
        &--sm {
            .listbox-label {
                font-size: 0.6rem;
                font-weight: 600;
            }
        }

        &--md {
            .listbox-label {
                font-size: 1rem;
                line-height: 1rem;
                height: 1rem !important;
            }
        }

        &--lg {
            .listbox-label {
                font-size: 1.5rem !important;
                line-height: 1.5rem !important;
                height: 1.5rem !important;
            }
        }
    }
}
</style>
