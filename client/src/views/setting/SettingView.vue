<script setup>
import Header from '@/components/organisms/Header.vue'
import MenuButton from '@/components/molecules/MenuButton.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['update:setDateButton', 'update:dashboardEditButton'])
emit('update:setDateButton', false)
emit('update:dashboardEditButton', false)
</script>

<template>
    <div class="container-menu">
        <header>
            <h2>Settings</h2>
            <p>
                Manage settings
            </p>
        </header>
        <section>
          <MenuButton
              icon="Badge"
              title="Web site"
              description="Manage your website informations"
              :path="'/analytics/' + $route.params.site + '/setting/website-info'"
          />
          <MenuButton
              icon="VpnKey"
              title="API key"
              description="Manage website API key"
              :path="'/analytics/' + $route.params.site + '/setting/api-key'"
          />
          <MenuButton
              icon="LinkOff"
              title="Untracked pages"
              description="Manage your untracked pages"
              :path="'/analytics/' + $route.params.site + '/setting/untracked-page'"
          />
          <MenuButton
              icon="Group"
              title="Website users"
              description="Manage website users & permissions"
              :path="'/analytics/' + $route.params.site + '/setting/website-users'"
          />
          <MenuButton
              icon="Group"
              title="Users"
              description="As digitanalytics admin manage all users"
              :path="'/analytics/' + $route.params.site + '/setting/users'"
          />
        </section>
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
