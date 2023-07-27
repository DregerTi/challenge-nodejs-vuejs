<script setup>
import PinCard from '@/components/molecules/PinCard.vue'
import Card from '@/components/molecules/Card.vue'
import { defineProps, defineEmits, onBeforeMount, computed, ref } from 'vue'
import RoundedButton from '@/components/atoms/RoundedButton.vue'
import { useStore } from 'vuex'
import SessionWidget from '@/components/organisms/SessionWidget.vue'
import PageViewWidget from '@/components/organisms/PageViewsWidget.vue'
import TotalUsersWidget from '@/components/organisms/TotalUsersWidget.vue'
import ActiveUsersWidget from '@/components/organisms/ActiveUsersWidget.vue'
import NewUsersWidget from '@/components/organisms/NewUsersWidget.vue'
import TagWidget from '@/components/organisms/TagWidget.vue'
import ConversionTunnelWidget from '@/components/organisms/ConversionTunnelWidget.vue'

const { dashboardEditMode } = defineProps({
    dashboardEditMode: {
        type: Boolean,
        default: false
    }
})

const count = ref(0)

function addComponent() {
    count.value += 1
}

function deleteItemMethod(id) {
    store.dispatch('deleteDashboardItem', id)
    store.dispatch('getDashboardItems')
}

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', true)
emit('update:dashboardEditButton', true)

const store = useStore()
const activeUsers = computed(() => store.state.eventStore.activeUsers)
const possibleKpis = computed(() => store.state.dashboardItemStore.possibleKpis)
const dashboardItems = computed(() => store.state.dashboardItemStore.dashboardItems)

function updateItem(value, item) {
    item.kpi = value
    item.name = value
    if (item.id) {
        store.dispatch('updateDashboardItem', item)
    } else {
        store.dispatch('createDashboardItem', item)
        count.value = 0
    }
}

onBeforeMount(() => {
    store.dispatch('getActiveUsers')
    store.dispatch('getPossibleKpis')
    store.dispatch('getDashboardItems')
})
</script>

<template>
    <div>
        <section class="pin-container">
            <PinCard title="Active users" :value="activeUsers" :editMode="dashboardEditMode" />
            <PinCard
                title="Active users"
                description="10% less from last month"
                value="33"
                trend="down"
                variant="primary"
                :editMode="dashboardEditMode"
            />
            <PinCard
                title="Active users"
                description="10% less from last month"
                value="33"
                trend="down"
                variant="primary"
                :editMode="dashboardEditMode"
            />
            <PinCard
                title="Active users"
                description="10% less from last month"
                value="33"
                trend="down"
                variant="primary"
                :editMode="dashboardEditMode"
            />
        </section>
        <div class="dashboard-grid">
            <Card
                v-for="item in dashboardItems"
                :key="item.id"
                @update:model-value="(value) => updateItem(value, item)"
                :select-values="possibleKpis"
                :title="item.name"
                :editMode="dashboardEditMode"
                @click:edit-button="deleteItemMethod(item.id)"
                path="/"
            >
                <SessionWidget v-if="item.name === 'Sessions'" />
                <PageViewWidget v-if="item.name === 'Page Views'" />
                <TotalUsersWidget v-if="item.name === 'Total Users'" />
                <ActiveUsersWidget v-if="item.name === 'Active Users'" />
                <NewUsersWidget v-if="item.name === 'New Users'" />
                <TagWidget v-if="item.name.startsWith('Tag ')" />
                <ConversionTunnelWidget v-if="item.name.startsWith('Conversion Tunnel ')" />
            </Card>
            <Card
                v-for="component in count"
                :key="component"
                @update:model-value="(value) => updateItem(value, {})"
                :select-values="possibleKpis"
                title="Page View"
                :editMode="dashboardEditMode"
                path="/"
            />

            <RoundedButton
                v-if="dashboardEditMode"
                icon="Close"
                variant="primary"
                size="md"
                @click="addComponent"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.pin-container {
    display: flex;
    gap: 2rem;

    .pin-card {
        flex-grow: 1;
    }
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    margin-top: 3rem;
    grid-column-gap: 2rem;
    grid-row-gap: 2.62rem;

    > .cta-add-card {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: #e0e0e0;
        }
    }

    > div {
        background-color: red;
    }
}

@media (max-width: 1024px) {
    .pin-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        .pin-card {
            width: 100% !important;
        }
    }

    .dashboard-grid {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(6, 1fr);
        grid-row-gap: 1.5rem;
    }
}
</style>
