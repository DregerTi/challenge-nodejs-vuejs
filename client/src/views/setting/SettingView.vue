<script setup>
import Header from '@/components/organisms/Header.vue'
import MenuButton from '@/components/molecules/MenuButton.vue'
import { computed, defineEmits, onMounted } from 'vue'
import AuthProvider from '@/contexts/AuthProvider.vue'
import { useStore } from 'vuex'

const store = useStore()
const site = computed(() => store.state.siteStore.site)
const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', false)
emit('update:dashboardEditButton', false)
</script>

<template>
    <div class="container-menu">
        <Auth-provider #default="{ user, logout }">
            <header>
                <h2>Settings</h2>
                <p>Manage settings</p>
            </header>
            <section>
                <MenuButton
                    v-if="site?.id"
                    icon="Badge"
                    title="Web site"
                    description="Manage your website informations"
                    :path="'/analytics/' + site?.id + '/setting/website-info'"
                />
                <MenuButton
                    v-if="site?.id"
                    icon="VpnKey"
                    title="API key"
                    description="Manage website API key"
                    :path="'/analytics/' + site?.id + '/setting/api-key'"
                />
                <MenuButton
                    v-if="site?.id"
                    icon="LinkOff"
                    title="Untracked pages"
                    description="Manage your untracked pages"
                    :path="'/analytics/' + site?.id + '/setting/untracked-page'"
                />
                <MenuButton
                    v-if="site?.id"
                    icon="Group"
                    title="Website users"
                    description="Manage website users & permissions"
                    :path="'/analytics/' + site?.id + '/setting/website-users'"
                />
                <MenuButton
                    icon="Add"
                    title="Add website"
                    description="Start to track your website"
                    path="/analytics/setting/create"
                />
                <MenuButton icon="Logout" title="Logout" @click="logout" :path="'/auth/login'" />
            </section>
        </Auth-provider>
    </div>
</template>

<style lang="scss">
.container-menu {
    margin-top: 5rem;
    > section {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin: 5rem 0;
    }
    > header {
        display: flex;
        flex-direction: column;
        align-items: baseline !important;
        > h2 {
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--color-grey);
        }
        > p {
            font-size: 1.2rem;
            font-weight: 400;
            color: var(--color-grey);
        }
    }
}

@media (max-width: 1024px) {
    .container-menu {
        margin-top: 0rem;
        > section {
            display: grid;
            margin: 2rem 0;
            gap: 1.4rem;
            width: calc(100% - 1.4rem);
            grid-template-columns: 50% 50%;
            > .menu-button {
                width: 100%;
            }
        }
        > header {
            > h2 {
                font-size: 1.2rem;
            }
            > p {
                font-size: 1rem;
            }
        }
    }
}
</style>
