<script setup>
import Header from '@/App.vue'
import Switch from '@/components/atoms/Switch.vue'
</script>

<template>
    <div class="body">
        <div class="flex flex-column gap-2 container-xl">
            <header class="auth-header">
                <img src="@/assets/logo.svg" alt="logo" class="header-logo" />
                <Switch class="switch" />
            </header>
            <section class="auth-container">
                <section>
                    <h1>Use the Google Analytics killer for your website, use DigitalAnalytics</h1>
                </section>
                <RouterView v-slot="{ Component }">
                    <transition v-if="Component" enter-active-class="animate__animated animate__fadeInRight"
                        leave-active-class="animate__animated animate__fadeOutLeft" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </RouterView>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
.body {
    width: 100%;
    display: flex;
    justify-content: center;
    position: initial;
}

.container-xl {
    width: 100%;
    max-width: 1530px;
    flex-direction: column;
    padding: 2rem 2rem;
    height: 100vh;
}

.auth-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.625rem;

    >.header-logo {
        width: 60px;
    }
}

.auth-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.625rem;
    margin: 3rem 0;
    height: inherit;

    > :first-child {
        width: 50%;
        background-color: var(--color-primary);
        color: var(--color-text);
        border-radius: 2rem;
        padding: 2.5rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 12;

        h1 {
            font-size: 3rem !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
            color: var(--color-grey);
            margin-top: 1rem;
        }
    }

    > :last-child {
        width: 50%;
        color: var(--color-text-secondary);
        gap: 7rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: 1.4rem;

        >div {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;

            >h2 {
                font-size: 1.875rem !important;
                line-height: 2.25rem !important;
                font-weight: 500 !important;
                color: var(--color-text);
            }

            >p {
                font-size: 1.125rem;
                line-height: 1.75rem;
                font-weight: 500;
            }
        }

        .button {
            margin-top: 2rem;
        }

        >form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
}

.a-href {
    color: var(--color-text);
    font-weight: 800 !important;
    text-decoration: none;

    &:hover {
        color: var(--color-text-secondary) !important;
    }
}

@media (max-width: 1024px) {
    .auth-header {
        >.header-logo {
            width: 48px;
        }
    }

    .auth-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2.625rem;
        margin: 3rem 0;

        > :first-child {
            display: none;
        }

        > :last-child {
            width: 100%;
            color: var(--color-text-secondary);
            gap: 4rem;
            height: 100%;
            display: flex;
            flex-direction: column;

            >div {
                display: flex;
                flex-direction: column;
                gap: 0.8rem;

                >h2 {
                    font-size: 1.875rem !important;
                    line-height: 2.25rem !important;
                    font-weight: 500 !important;
                    color: var(--color-text);
                }

                >p {
                    font-size: 1.125rem;
                    line-height: 1.75rem;
                    font-weight: 500;
                }
            }

            >form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
    }
}
</style>
