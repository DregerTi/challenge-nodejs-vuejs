<script setup>
import { RouterView, useRoute } from 'vue-router'
import Button from '@/components/atoms/Button.vue'
import Header from '@/components/organisms/Header.vue'
import { computed, onBeforeMount, onUpdated, ref } from 'vue'
import Listbox from '@/components/atoms/Listbox.vue'
import Calendar from '../molecules/Calendar.vue'
import SiteProvider from '@/contexts/SiteProvider.vue'
import router from '@/router'
import { useStore } from 'vuex'
import dayjs from 'dayjs'

const setDateButton = ref(false)
const dashboardEditButton = ref(false)
const dashboardEditMode = ref(false)

function toogleDashboardEditMode() {
    dashboardEditMode.value = !dashboardEditMode.value
}

const store = useStore()
const dateValue = {
    startDate: dayjs().add(-29, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
}
const site = computed(() => store.state.siteStore.site)
const sites = computed(() => store.state.siteStore.sites)

onBeforeMount(async () => {
    await store.dispatch('getSites')
    if (router.currentRoute.value.params.site) {
        await store.dispatch('getSite', router.currentRoute.value.params.site)
    }
    store.commit('setRangeDate', dateValue)
})
</script>

<template>
    <div class="body">
        <Header />
        <div>
            <div class="container">
                <header v-if="sites">
                    <Listbox variant="lg" :values="sites" path="dashboard" />
                    <div class="actions">
                        <Calendar class="dateButton" v-if="setDateButton" />
                        <Button
                            v-if="dashboardEditButton && !dashboardEditMode"
                            v-bind:onClick="toogleDashboardEditMode"
                            icon="Edit"
                        />
                        <Button
                            v-if="dashboardEditButton && dashboardEditMode"
                            v-bind:onClick="toogleDashboardEditMode"
                            icon="Check"
                        />
                    </div>
                </header>
                <RouterView
                    v-slot="{ Component }"
                    :dashboardEditMode="dashboardEditMode"
                    v-model:setDateButton="setDateButton"
                    v-model:dashboardEditButton="dashboardEditButton"
                >
                    <transition
                        v-if="Component"
                        enter-active-class="animate__animated animate__fadeInRight"
                        leave-active-class="animate__animated animate__fadeOutLeft"
                        mode="out-in"
                    >
                        <component :is="Component" />
                    </transition>
                </RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    transition: all 0.3s;

    > div {
        display: flex;
        justify-content: center;
        width: 100%;

        .container {
            width: 100%;
            max-width: 1280px;
            display: flex;
            flex-direction: column;
            gap: 2.625rem;
            margin: 3.5rem 2rem;

            > header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .actions {
                    display: flex;
                    gap: 1rem;
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .body {
        > div {
            .container {
                padding: 0 1rem;
                margin: 1.4rem 0;
                margin-bottom: 8rem;

                > header {
                    flex-direction: column;
                    align-items: baseline;
                    gap: 1.6rem;

                    .actions {
                        width: 100%;

                        > .dateButton {
                            flex-grow: 1;
                        }
                    }
                }
            }
        }
    }
}
</style>
