<script setup>
import { RouterView } from 'vue-router'
import Button from '@/components/atoms/Button.vue'
import Header from '@/components/organisms/Header.vue'
import { defineEmits, ref } from 'vue'
import Input from '@/components/atoms/Input.vue'
import Calendar from '../molecules/Calendar.vue'
import router from '@/router'

const deleteBtn = ref(false)
const updateBtn = ref(false)
const calendarBtn = ref(false)
const mdMenuExplore = ref(false)
const descriptionHidden = ref(true)
const screenShotBtn = ref(false)

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', false)
emit('update:dashboardEditButton', false)

const { title, items, description, createNewPath, path } = defineProps({
    title: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    createNewPath: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="container-explore">
        <header :class="[mdMenuExplore ? 'md-menu-explore' : '']">
            <Input type="text" placeholder="Search" name="search" variant="search" />
            <RouterLink v-if="createNewPath" :to="createNewPath">
                <Button title="Create new" />
            </RouterLink>
            <nav>
                <RouterLink v-for="item in items" :key="item.id" :to="path + '/' + item.id">
                    <Button :title="item.name ? item.name : item.url" :variant="router.currentRoute.value.params.id &&
                            router.currentRoute.value.params.id == item.id
                            ? 'dark-grey'
                            : 'light-grey'
                        " />
                </RouterLink>
            </nav>
        </header>
        <section>
            <header>
                <div>
                    <h2>
                        {{ title }}
                    </h2>
                    <div v-if="$route.params.id">
                        <Calendar v-if="calendarBtn" class="calendar-button" />
                        <Button v-if="screenShotBtn" icon="ScreenshotMonitor" />
                        <RouterLink v-if="updateBtn" :to="$route.params.id + '/edit'">
                            <Button icon="Edit" />
                        </RouterLink>
                        <RouterLink v-if="deleteBtn" :to="$route.params.id + '/delete'">
                            <Button icon="Delete" variant="error" />
                        </RouterLink>
                    </div>
                </div>
                <p v-if="descriptionHidden">
                    {{ description }}
                </p>
            </header>
            <section>
                <RouterView v-slot="{ Component }" v-model:deleteBtn="deleteBtn" v-model:updateBtn="updateBtn"
                    v-model:calendarBtn="calendarBtn" v-model:descriptionHidden="descriptionHidden"
                    v-model:mdMenuExplore="mdMenuExplore" v-model:screenShotBtn="screenShotBtn">
                    <transition v-if="Component" enter-active-class="animate__animated animate__fadeInRight"
                        leave-active-class="animate__animated animate__fadeOutLeft" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </RouterView>
            </section>
        </section>
    </div>
</template>

<style lang="scss">
.container-explore {
    display: flex;
    gap: 3rem;
    height: 100%;

    >header {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        z-index: 1;
        width: 250px;
        padding: 1.2rem;
        background-color: var(--color-light-grey);
        border-radius: 1rem;

        >a {
            width: 100%;

            >* {
                width: 100%;
            }
        }

        >.input {
            width: 100%;
            padding: 0;

            >input {
                width: 100%;
                border-radius: 10px !important;
                background-color: var(--color-dark-grey);

                &::placeholder {
                    /* Chrome, Firefox, Opera, Safari 10.1+ */
                    color: var(--color-grey);
                    opacity: 1;
                    /* Firefox */
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

        >nav {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-height: 100%;
            overflow-y: scroll;
            padding-top: 1rem;
            width: 100%;

            >a {
                width: 100%;

                >* {
                    width: 100%;
                }
            }
        }
    }

    .event-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        >* {
            width: 100%;
        }

        margin: 4rem 0;
    }

    >section {
        flex-grow: 1;

        >header {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            >p {
                font-size: 1.2rem;
                font-weight: 400;
                color: var(--color-grey);
            }

            >div {
                display: flex;
                justify-content: space-between;

                >div {
                    display: flex;
                    gap: 1rem;
                }

                >h2 {
                    color: var(--color-grey);
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .container-explore {
        flex-direction: column;
        gap: 1rem;

        >header {
            order: 2;
            width: 100%;
        }

        .md-menu-explore {
            display: none;
        }

        >section {
            >header {
                >div {
                    gap: 2rem;
                    flex-direction: column;

                    >div {
                        >* {
                            flex-grow: 1;
                        }

                        .calendar-button {
                            flex-grow: 9000;
                        }
                    }
                }
            }
        }
    }
}
</style>
