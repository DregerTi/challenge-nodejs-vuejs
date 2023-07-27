<script setup>
import Header from '@/App.vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/atoms/Button.vue'
import { ref } from 'vue'
import Switch from '@/components/atoms/Switch.vue'
import SiteProvider from '@/contexts/SiteProvider.vue'

const isOpen = ref(true)
const isOpenBtn = 'xl-primary-bg-unset'
const isCloseBtn = 'xl-bg-unset'

function mouseLeave() {
    isOpen.value = false
}

function mouseOver() {
    isOpen.value = true
}
</script>

<template>
    <header
        class="header"
        v-bind:class="[isOpen ? 'header--open' : '']"
        v-on:mouseover="mouseOver"
        v-on:mouseleave="mouseLeave"
    >
        <SiteProvider #default="{ site }">
            <img src="@/assets/logo.svg" alt="logo" class="header-logo" />
            <div>
                <nav>
                    <RouterLink v-if="site" :to="'/analytics/' + $route.params.site + '/dashboard'">
                        <Button
                            icon="Dashboard"
                            v-bind:variant="isOpen ? isCloseBtn : isOpenBtn"
                            v-bind:title="isOpen ? 'Dashboard' : ''"
                        />
                    </RouterLink>
                    <RouterLink v-if="site" :to="'/analytics/' + $route.params.site + '/audience'">
                        <Button
                            icon="Timeline"
                            v-bind:variant="isOpen ? isCloseBtn : isOpenBtn"
                            v-bind:title="isOpen ? 'Audience' : ''"
                        />
                    </RouterLink>
                    <RouterLink v-if="site" :to="'/analytics/' + $route.params.site + '/explore'">
                        <Button
                            icon="AccountTree"
                            v-bind:variant="isOpen ? isCloseBtn : isOpenBtn"
                            v-bind:title="isOpen ? 'Explore' : ''"
                        />
                    </RouterLink>
                    <RouterLink :to="'/analytics/' + $route.params.site + '/me'">
                        <Button
                            icon="Person"
                            v-bind:variant="isOpen ? isCloseBtn : isOpenBtn"
                            v-bind:title="isOpen ? 'My account' : ''"
                        />
                    </RouterLink>
                    <RouterLink :to="'/analytics/' + $route.params.site + '/setting'">
                        <Button
                            icon="Settings"
                            v-bind:variant="isOpen ? isCloseBtn : isOpenBtn"
                            v-bind:title="isOpen ? 'Settings' : ''"
                        />
                    </RouterLink>
                </nav>
                <Switch class="switch" />
            </div>
        </SiteProvider>
    </header>
</template>

<style lang="scss">
.header {
    position: sticky;
    top: 1.625rem;
    margin: 1.625rem 0rem 1.625rem 1.625rem;
    display: flex;
    padding: 1.625rem 1rem;
    flex-direction: column;
    align-items: center;
    gap: 4.5rem;
    height: calc(100vh - 3.25rem);
    width: fit-content;
    width: 82px;
    border-radius: 24px;
    background-color: unset;
    transition: all 0.3s ease-in-out;
    z-index: 30;

    > .header-logo {
        width: 50px;
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        flex: 1 0 0;
        width: 100%;

        > nav {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: baseline;
            gap: 2.5rem;
            width: 100%;
        }
    }

    &.header--open {
        width: 280px;
        background-color: var(--color-light-black);
    }
}

@media (max-width: 1024px) {
    .header {
        z-index: 10;
        margin: 0;
        height: fit-content;
        border-radius: 0;
        position: fixed;
        padding: 1.4rem 1.4rem;
        background-color: var(--color-background);
        top: calc(100vh - 92.5px);
        transition: top 0s !important;
        width: 100vw;

        > .header-logo {
            display: none;
        }

        .switch {
            display: none;
        }

        > div {
            > nav {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 0;
                width: 100%;
            }
        }

        &.header--open {
            width: 100vw;
            max-width: 100vw;
            background-color: var(--color-background);

            .button--xl-bg-unset {
                > p {
                    display: none;
                }

                color: var(--color-light-black);

                &:hover {
                    background-color: unset !important;
                    color: var(--color-secondary) !important;
                }
            }
        }
    }
}
</style>
